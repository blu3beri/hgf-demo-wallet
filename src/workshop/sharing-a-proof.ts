import type { Agent } from '@aries-framework/core'

// In this function we accept an incoming proof from another agent.
//
// An important note is that we first might get the credential that would
// fulfil the requirements of the proof request. After we have gotten all the
// credentials from our wallet, we must select the credential(s) that we want
// to use.
export async function acceptProof(agent: Agent, proofRecordId: string) {}

// When a proof request asks for data you do not want to share, you can also
// decline the proof request.
export async function declineProof(agent: Agent, proofRecordId: string) {}

// As with credentials, we can also delete proof requests. This might be
// because we have declined one or maybe simply to clean up our wallet.
export async function deleteProof(agent: Agent, proofRecordId: string) {}
