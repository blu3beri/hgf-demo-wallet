import type { Agent, OutOfBandInvitation } from '@aries-framework/core'

export async function acceptInvitation(agent: Agent, data: string) {}

export async function parseInvitation(
  agent: Agent,
  data: string
): Promise<OutOfBandInvitation> {}
