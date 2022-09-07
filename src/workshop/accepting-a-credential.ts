import { Agent } from '@aries-framework/core'

export async function acceptCredential(
  agent: Agent,
  credentialRecordId: string
) {
  await agent.credentials.acceptOffer({ credentialRecordId })
}

export async function declineCredential(
  agent: Agent,
  credentialRecordId: string
) {
  await agent.credentials.declineOffer(credentialRecordId)
}

export async function deleteCredential(
  agent: Agent,
  credentialRecordId: string
) {
  await agent.credentials.deleteById(credentialRecordId)
}
