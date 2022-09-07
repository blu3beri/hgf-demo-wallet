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
import { GENESIS_BCORVIN_TEST_NET } from '../ledgers'

export async function initializeAgent(): Promise<Agent> {
  const config: InitConfig = {
    label: 'wallet-demo-id',
    walletConfig: {
      id: 'wallet-demo-id',
      key: 'testkey0000000000000000000000000',
    },
    autoAcceptConnections: true,
    autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
    autoAcceptProofs: AutoAcceptProof.ContentApproved,
    logger: new ConsoleLogger(LogLevel.off),

    indyLedgers: [
      {
        id: 'bcovrin-test-net',
        isProduction: false,
        genesisTransactions: GENESIS_BCORVIN_TEST_NET,
      },
    ],

    mediatorPickupStrategy: MediatorPickupStrategy.Implicit,
    mediatorConnectionsInvite:
      'https://http.mediator.community.animo.id?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiYTY1NTgwMTEtZjkyOS00NzY2LTllYzUtZDJkNzI1ZGQ3NmViIiwgImxhYmVsIjogIkFuaW1vIENvbW11bml0eSBNZWRpYXRvciIsICJyZWNpcGllbnRLZXlzIjogWyI4Vm13OGZicmdlaXFHUEpCeVNzR2hxcjU5QTlzMjRBN3lvYUpzVDNyTnFjayJdLCAic2VydmljZUVuZHBvaW50IjogImh0dHBzOi8vaHR0cC5tZWRpYXRvci5jb21tdW5pdHkuYW5pbW8uaWQifQ==',
  }

  const agent = new Agent(config, agentDependencies)

  agent.registerOutboundTransport(new HttpOutboundTransport())
  agent.registerOutboundTransport(new WsOutboundTransport())

  await agent.initialize()

  return agent
}
