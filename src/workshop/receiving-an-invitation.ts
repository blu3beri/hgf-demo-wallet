import { Agent, OutOfBandInvitation } from '@aries-framework/core'

export async function acceptInvitation(agent: Agent, data: string) {
  await agent.oob.receiveInvitationFromUrl(data, { reuseConnection: true })
}

export async function parseInvitation(
  agent: Agent,
  data: string
): Promise<OutOfBandInvitation> {
  return await agent.oob.parseInvitationShortUrl(data)
}
