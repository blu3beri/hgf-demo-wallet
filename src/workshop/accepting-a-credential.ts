import type { Agent } from '@aries-framework/core'

// In this function we have to accept an incoming credential offer. We can use
// the agent for this any we only need the credentialRecordId of the credential
// we want to accept
export async function acceptCredential(
  agent: Agent,
  credentialRecordId: string
) {}

// Sometimes we can receive a credential that we do not want. This might be
// because of a typo or some spam. In this function we decline an incoming
// credential offer.
export async function declineCredential(
  agent: Agent,
  credentialRecordId: string
) {}

// There can be many reasons to delete a credential, this might be because you
// declined it and you want to clear it from your wallet or your credential
// might have been revoked and becomes useless.
export async function deleteCredential(
  agent: Agent,
  credentialRecordId: string
) {}
