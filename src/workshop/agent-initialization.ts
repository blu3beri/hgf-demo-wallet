import { Agent } from '@aries-framework/core'
import { agentDependencies } from '@aries-framework/react-native'

export function initializeAgent(): Agent {
  return new Agent({ label: 'demo' }, agentDependencies)
}
