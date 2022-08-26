import React from 'react'
import { StackParamList } from '../navigation'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BarcodeScanner } from '../components'
import { Tabs } from './Tabs'
import { CredentialDetails } from '../pages/credentials'
import { ConnectionDetails } from '../pages/connections'
import { ProofDetails } from '../pages/proofs'

export const Stack = () => {
  const Stack = createNativeStackNavigator<StackParamList>()

  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen
        name="BarcodeScanner"
        component={BarcodeScanner}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen name="CredentialDetails" component={CredentialDetails} />
      <Stack.Screen name="ConnectionDetails" component={ConnectionDetails} />
      <Stack.Screen name="ProofDetails" component={ProofDetails} />
    </Stack.Navigator>
  )
}
