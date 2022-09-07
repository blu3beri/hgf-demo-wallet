import { Agent } from '@aries-framework/core'
import { Alert } from 'react-native'

export async function acceptInvitation(agent: Agent, data: string) {
  await agent.oob.receiveInvitationFromUrl(data, { reuseConnection: true })
}

export async function parseInvitation(
  agent: Agent,
  data: string,
  confirmCallback: () => void,
  onDeclineCallback: (error: string) => void,
  onError: (error: unknown) => void
) {
  agent.oob
    .parseInvitationShortUrl(data)
    .then((invite) => {
      Alert.alert('Invitation', `Received invitation from: ${invite.label}`, [
        {
          text: 'cancel',
          onPress: onDeclineCallback,
          style: 'cancel',
        },
        { text: 'confirm', onPress: confirmCallback },
      ])
    })
    .catch(onError)
}
