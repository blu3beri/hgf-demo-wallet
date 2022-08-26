import { ConnectionDetailsRouteParams } from '../pages/connections'
import { CredentialDetailsRouteParams } from '../pages/credentials'
import { ProofDetailsRouteParams } from '../pages/proofs'

export type TabParamList = {
  Credentials: undefined
  Contacts: undefined
  Proofs: undefined
}

export type StackParamList = {
  BarcodeScanner: undefined
  Tabs: undefined
  CredentialDetails: CredentialDetailsRouteParams
  ConnectionDetails: ConnectionDetailsRouteParams
  ProofDetails: ProofDetailsRouteParams
}
