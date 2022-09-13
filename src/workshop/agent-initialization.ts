import {
  Agent,
  AutoAcceptCredential,
  AutoAcceptProof,
  ConsoleLogger,
  HttpOutboundTransport,
  InitConfig,
  LogLevel,
  MediatorPickupStrategy,
  WsOutboundTransport,
} from '@aries-framework/core'
import { agentDependencies } from '@aries-framework/react-native'
import { pool_transactions_indicio_testnet_genesis } from '../ledgers'

export const mediatorInvitation =
  'https://http.mediator.community.animo.id?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiYTY1NTgwMTEtZjkyOS00NzY2LTllYzUtZDJkNzI1ZGQ3NmViIiwgImxhYmVsIjogIkFuaW1vIENvbW11bml0eSBNZWRpYXRvciIsICJyZWNpcGllbnRLZXlzIjogWyI4Vm13OGZicmdlaXFHUEpCeVNzR2hxcjU5QTlzMjRBN3lvYUpzVDNyTnFjayJdLCAic2VydmljZUVuZHBvaW50IjogImh0dHBzOi8vaHR0cC5tZWRpYXRvci5jb21tdW5pdHkuYW5pbW8uaWQifQ=='

export async function initializeAgent(): Promise<Agent> {
  const config: InitConfig = {
    label: 'wallet-demo-id-new-new-new-new',
    walletConfig: {
      id: 'wallet-demo-id-new-new-new-new',
      key: 'testkey0000000000000000000000001',
    },
    autoAcceptConnections: true,
    autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
    autoAcceptProofs: AutoAcceptProof.ContentApproved,
    logger: new ConsoleLogger(LogLevel.debug),

    indyLedgers: [
      {
        id: 'indicio-test-net',
        isProduction: false,
        genesisTransactions: pool_transactions_indicio_testnet_genesis,
      },
    ],

    mediatorPickupStrategy: MediatorPickupStrategy.Implicit,
    mediatorConnectionsInvite: mediatorInvitation,
  }

  const agent = new Agent(config, agentDependencies)

  agent.registerOutboundTransport(new HttpOutboundTransport())
  agent.registerOutboundTransport(new WsOutboundTransport())

  await agent.initialize()

  return agent
}
