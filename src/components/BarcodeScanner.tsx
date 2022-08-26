import React, { useState, useEffect } from 'react'
import { Text, Center, useTheme } from 'native-base'
import { StyleSheet, Alert } from 'react-native'
import { BarCodeScanner as BCS } from 'expo-barcode-scanner'
import { useStackNavigation } from '../hooks'
import { ConnectionInvitationMessage } from '@aries-framework/core'
import { useToast } from 'native-base'
import { useAgent } from '@aries-framework/react-hooks'

export const BarcodeScanner = () => {
  const navigation = useStackNavigation()
  const toast = useToast()
  const { agent } = useAgent()
  const { colors } = useTheme()

  const [hasPermission, setHasPermission] = useState(null)
  const [scannedData, setScannedData] = useState('')

  const onAcceptInvitation = async () => {
    await agent?.oob.receiveInvitationFromUrl(scannedData).catch((e) => {
      toast.show({
        placement: 'top',
        title: 'Something went wrong while accepting the notification',
        background: colors.error[500],
      })
      console.error(e)
    })
    navigation.goBack()
  }

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BCS.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    getBarCodeScannerPermissions()
  }, [])

  useEffect(() => {
    if (!scannedData) return

    try {
      const invite = ConnectionInvitationMessage.fromUrl(scannedData)

      Alert.alert('Invitation', `Received invitation from: ${invite.label}`, [
        { text: 'cancel', onPress: () => navigation.goBack(), style: 'cancel' },
        { text: 'confirm', onPress: () => void onAcceptInvitation() },
      ])
    } catch {
      toast.show({
        placement: 'top',
        title: 'Invalid invitation',
        background: colors.error[500],
      })
      navigation.goBack()
      return
    }
  }, [scannedData])

  const handleBarCodeScanned = ({ data }) => setScannedData(data)

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <Center flex={1}>
      <BCS
        onBarCodeScanned={scannedData ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFill}
      />
    </Center>
  )
}
