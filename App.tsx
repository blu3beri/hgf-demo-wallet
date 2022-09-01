import 'expo-dev-client'
import React, { useEffect, useState } from 'react'
import AgentProvider from '@aries-framework/react-hooks'
import { initializeAgent } from './src/agent'
import { Agent } from '@aries-framework/core'
import { NativeBaseProvider } from 'native-base'
import { customTheme } from './src/theme'
import { NavigationContainer } from '@react-navigation/native'
import { Stack } from './src/navigation'
import { LinearGradient } from 'expo-linear-gradient'

export default function app() {
  const [agent, setAgent] = useState<Agent>()

  useEffect(() => {
    ;(async () => setAgent(await initializeAgent()))()
  }, [])

  return (
    <NativeBaseProvider
      theme={customTheme}
      config={{ dependencies: { 'linear-gradient': LinearGradient } }}
    >
      <AgentProvider agent={agent}>
        <NavigationContainer
          theme={{
            dark: false,
            colors: {
              background: customTheme.colors.white,
              border: customTheme.colors.gray[500],
              card: customTheme.colors.white,
              notification: customTheme.colors.error[500],
              primary: customTheme.colors.primary[500],
              text: customTheme.colors.text[500],
            },
          }}
        >
          <Stack />
        </NavigationContainer>
      </AgentProvider>
    </NativeBaseProvider>
  )
}
