import React, { useEffect } from 'react'
import { Box, FlatList, Pressable, useTheme, Text } from 'native-base'
import { useStackNavigation } from '../../hooks'
import { useAgent, useCredentialById } from '@aries-framework/react-hooks'
import { CredentialState } from '@aries-framework/core'
import { Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useToast } from 'native-base'
import { ListItem } from '../../components'
import {
  acceptCredential,
  declineCredential,
  deleteCredential as _deleteCredential,
} from '../../workshop'

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
        <Ionicons name="trash-outline" size={24} onPress={deleteCredential} />
      ),
    })
  }, [])

  const deleteCredential = () => {
    const onConfirm = () => {
      void _deleteCredential(agent, id)
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
        declineCredential(agent, id)
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
    await acceptCredential(agent, id).catch((e) => {
      console.error(e)
      toast.show({
        placement: 'top',
        title: 'Something went wrong while accepting the credential',
        background: colors.error[500],
      })
    })
    navigation.goBack()
  }

  if (!attributes) {
    toast.show({
      placement: 'top',
      title: 'Invalid credential',
      background: colors.error[500],
    })
    void declineCredential(agent, id)
  }

  return (
    <>
      <FlatList
        data={Object.entries(attributes)}
        renderItem={({ item }) => (
          <ListItem title={item[0]} subtitle={item[1]} />
        )}
        keyExtractor={(item) => item[0]}
      />
      {record.state === CredentialState.OfferReceived && (
        <Box
          flexDir="row"
          h={95}
          padding="2"
          backgroundColor={colors.tertiary[100]}
          paddingBottom={4}
        >
          <Pressable flex={1} onPress={onDeclineCredential}>
            {({ isPressed }) => (
              <Box
                justifyContent="center"
                alignItems="center"
                flex={1}
                margin={2}
                borderRadius={16}
                backgroundColor={isPressed ? 'gray.300' : 'gray.200'}
              >
                <Text color="black" fontWeight="600" fontSize="md">
                  Decline
                </Text>
              </Box>
            )}
          </Pressable>
          <Pressable flex={1} onPress={onAcceptCredential}>
            {({ isPressed }) => (
              <Box
                justifyContent="center"
                alignItems="center"
                flex={1}
                margin={2}
                borderRadius={16}
                backgroundColor={
                  isPressed ? colors.secondary[600] : colors.secondary[500]
                }
              >
                <Text color="white" fontWeight="600" fontSize="md">
                  Accept
                </Text>
              </Box>
            )}
          </Pressable>
        </Box>
      )}
    </>
  )
}
