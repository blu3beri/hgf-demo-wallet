import { Ionicons } from '@expo/vector-icons'
import { useTheme, Pressable, Box } from 'native-base'
import React from 'react'
import { useStackNavigation } from '../hooks'

export const Fab = () => {
  const { colors } = useTheme()
  const navigation = useStackNavigation()

  return (
    <Pressable onPress={() => navigation.navigate('BarcodeScanner')}>
      <Box
        bg={{
          linearGradient: {
            colors: ["#7FB46C", "#4789C5"],
            start: [0, 0],
            end: [1, 0],
          },
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          width: 60,
          height: 60,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.2,
          shadowRadius: 10,
          elevation: 3,
          margin: 16,
          position: 'absolute',
          bottom: 80,
          right: 0,
        }}
      >
        <Ionicons
          size={24}
          style={{ color: colors.white }}
          name="qr-code-outline"
        />
      </Box>
    </Pressable>
  )
}
