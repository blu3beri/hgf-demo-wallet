import { Agent } from '@aries-framework/core'
import { pool_transactions_bcovrin_greenlight_genesis } from '../ledgers'

export const mediatorInvitation =
  'https://http.mediator.community.animo.id?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiYTY1NTgwMTEtZjkyOS00NzY2LTllYzUtZDJkNzI1ZGQ3NmViIiwgImxhYmVsIjogIkFuaW1vIENvbW11bml0eSBNZWRpYXRvciIsICJyZWNpcGllbnRLZXlzIjogWyI4Vm13OGZicmdlaXFHUEpCeVNzR2hxcjU5QTlzMjRBN3lvYUpzVDNyTnFjayJdLCAic2VydmljZUVuZHBvaW50IjogImh0dHBzOi8vaHR0cC5tZWRpYXRvci5jb21tdW5pdHkuYW5pbW8uaWQifQ=='

// In order to get started we must initialize our agent. This agent needs some
// platform specific dependencies and a configuration.
export async function initializeAgent(): Promise<Agent> {}
