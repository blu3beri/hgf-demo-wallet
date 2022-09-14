import type { ProofRecord, RequestedCredentials } from '@aries-framework/core'

export type FormattedRequestedCredentials = Array<{
  name: string
  value: string
  id: string
  isPredicate: boolean
}>

export const formatRequestedCredentials = (
  record: ProofRecord,
  credentials: RequestedCredentials
): FormattedRequestedCredentials => {
  const { requestedAttributes, requestedPredicates, selfAttestedAttributes } =
    credentials
  const formattedCredentials: FormattedRequestedCredentials = []

  const proofRecordPredicates =
    record.requestMessage?.indyProofRequest.requestedPredicates

  // Generic attributes
  Object.entries(requestedAttributes).map(([key, value]) => {
    const attrs = value.credentialInfo?.attributes ?? {}
    const formattedValue =
      attrs[
        Object.keys(attrs).find((k) => k.toLowerCase() === key.toLowerCase())
      ]

    formattedCredentials.push({
      name: key,
      value: formattedValue,
      id: value.credentialId,
      isPredicate: false,
    })
  })

  // Generic predicates
  Object.entries(requestedPredicates).map(([key, value]) => {
    const attrs = value.credentialInfo?.attributes ?? {}
    const formattedValue =
      attrs[
        Object.keys(attrs).find((k) => k.toLowerCase() === key.toLowerCase())
      ]

    const { predicateType, predicateValue } = proofRecordPredicates.get(key)

    formattedCredentials.push({
      name: key,
      value: `${formattedValue} ${predicateType} ${predicateValue}`,
      id: value.credentialId,
      isPredicate: true,
    })
  })

  // Generic self attested
  Object.entries(selfAttestedAttributes).map(([key, value]) => {
    formattedCredentials.push({
      name: key,
      value: value,
      id: 'Self Attested',
      isPredicate: false,
    })
  })

  return formattedCredentials
}
