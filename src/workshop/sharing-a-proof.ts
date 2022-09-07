import { Agent } from '@aries-framework/core'

export async function acceptProof(agent: Agent, proofRecordId: string) {
  const creds = await agent.proofs.getRequestedCredentialsForProofRequest(
    proofRecordId
  )
  const requestedCredentials =
    agent.proofs.autoSelectCredentialsForProofRequest(creds)
  await agent.proofs.acceptRequest(proofRecordId, requestedCredentials)
}

export async function declineProof(agent: Agent, proofRecordId: string) {
  await agent.proofs.declineRequest(proofRecordId)
}

export async function deleteProof(agent: Agent, proofRecordId: string) {
  await agent.proofs.deleteById(proofRecordId)
}
