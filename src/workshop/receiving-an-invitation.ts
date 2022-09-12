import type { Agent, OutOfBandInvitation } from '@aries-framework/core'

// In this function we accept an invitation from another agent. This is
// required in order to start other flows like present proof or requesting a
// credential.
export async function acceptInvitation(
  agent: Agent,
  data: OutOfBandInvitation
) {}

// When we receive an invitation it is likely a QR code. In order to transform
// this QR code into something that the agent can understand, we have to parse
// it.
export async function parseInvitation(
  agent: Agent,
  data: string
): Promise<OutOfBandInvitation> {}
