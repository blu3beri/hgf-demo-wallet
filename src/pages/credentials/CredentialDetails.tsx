import React, { useEffect } from 'react'
import { Box, Button, FlatList, useTheme } from 'native-base'
import { useStackNavigation } from '../../hooks'
import { useAgent, useCredentialById } from '@aries-framework/react-hooks'
import { CredentialState } from '@aries-framework/core'
import { SafeAreaView, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useToast } from 'native-base'
import { ListItem } from '../../components'
import { color } from 'native-base/lib/typescript/theme/styled-system'

export type CredentialDetailsRouteParams = {
  id: string
  attributes: Record<string, string>
  name: string
}

type CredentialDetailsProps = {
  route: { params: CredentialDetailsRouteParams }
}

export const CredentialDetails: React.FC<CredentialDetailsProps> = ({
  route,
}) => {
  const {
    params: { attributes, id, name },
  } = route

  const navigation = useStackNavigation()
  const record = useCredentialById(id)
  const { colors } = useTheme()
  const { agent } = useAgent()
  const toast = useToast()

  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerShown: true,
      headerRight: () => (
        <Ionicons name='trash-outline' size={24} onPress={deleteCredential} />
      ),
    })
  }, [])

  const deleteCredential = () => {
    const onConfirm = () => {
      void agent.credentials.deleteById(id)
      navigation.goBack()
    }

    Alert.alert('Delete', 'Are you sure you want to delete the credential?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Confirm', style: 'destructive', onPress: onConfirm },
    ])
  }

  const onDeclineCredential = () => {
    try {
      const onConfirm = async () => {
        await agent.credentials.declineOffer(id)
        navigation.goBack()
      }
      Alert.alert(
        'Decline',
        'Are you sure you want to decline the credential?',
        [
          { style: 'cancel', text: 'cancel' },
          { style: 'destructive', onPress: onConfirm, text: 'confirm' },
        ]
      )
    } catch (e) {
      console.error(e)
      toast.show({
        placement: 'top',
        title: 'Something went wrong while declining the credential',
        background: colors.error[500],
      })
    }
  }

  const onAcceptCredential = async () => {
    try {
      await agent.credentials.acceptOffer({ credentialRecordId: id })
    } catch (e) {
      console.error(e)
      toast.show({
        placement: 'top',
        title: 'Something went wrong while accepting the credential',
        background: colors.error[500],
      })
    }
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={Object.entries(attributes)}
        renderItem={({ item }) => (
          <ListItem title={item[0]} subtitle={item[1]} />
        )}
        keyExtractor={(item) => item[0]}
      />
      {record.state === CredentialState.OfferReceived && (
        <Box flexDir="row" h={75}>
          <Button
            flex={1}
            borderRadius={0}
            backgroundColor="red.500"
            onPress={onDeclineCredential}
          >
            Decline
          </Button>
          <Button
            flex={1}
            borderRadius={0}
            backgroundColor="success.500"
            onPress={onAcceptCredential}
          >
            Accept
          </Button>
        </Box>
      )}
    </SafeAreaView>
  )
}
