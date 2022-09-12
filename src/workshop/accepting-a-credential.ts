import type { Agent } from '@aries-framework/core'

export async function acceptCredential(
  agent: Agent,
  credentialRecordId: string
) {}

export async function declineCredential(
  agent: Agent,
  credentialRecordId: string
) {}

export async function deleteCredential(
  agent: Agent,
  credentialRecordId: string
) {}
