import { Ionicons } from '@expo/vector-icons'
import { useTheme } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useStackNavigation } from '../hooks'

export const Fab = () => {
  const { colors } = useTheme()
  const navigation = useStackNavigation()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('BarcodeScanner')}
      style={{
        justifyContent: 'center',
        margin: 16,
        borderRadius: 100,
        alignItems: 'center',
        width: 60,
        height: 60,
        backgroundColor: colors.secondary[700],
        shadowColor: '#5b5b5b',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 3,
        position: 'absolute',
        bottom: 0,
        right: 0,
      }}
    >
      <Ionicons
        size={24}
        style={{ color: colors.text[50] }}
        name="qr-code-outline"
      />
    </TouchableOpacity>
  )
}
