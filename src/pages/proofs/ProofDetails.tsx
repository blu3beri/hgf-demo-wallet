import React, { useEffect, useState } from 'react'
import { Box, FlatList, Pressable, Text, useTheme } from 'native-base'
import { useStackNavigation } from '../../hooks'
import { useAgent, useProofById } from '@aries-framework/react-hooks'
import { ProofState } from '@aries-framework/core'
import { Ionicons } from '@expo/vector-icons'
import { useToast } from 'native-base'
import {
  formatRequestedCredentials,
  FormattedRequestedCredentials,
} from '../../utils/formatRequestedCredentials'
import { ListItem } from '../../components'
import {
  acceptProof,
  declineProof,
  deleteProof as _deleteProof,
} from '../../workshop'
import { Alert } from 'react-native'

export type ProofDetailsRouteParams = {
  id: string
}

type ProofDetailsProps = {
  route: { params: ProofDetailsRouteParams }
}

export const ProofDetails: React.FC<ProofDetailsProps> = ({ route }) => {
  const {
    params: { id },
  } = route

  const navigation = useStackNavigation()
  const record = useProofById(id)
  const { colors } = useTheme()
  const { agent } = useAgent()
  const toast = useToast()

  const [fields, setFields] = useState<FormattedRequestedCredentials>([])

  useEffect(() => {
    const name = record.requestMessage.indyProofRequest.name ?? 'Proof request'
    navigation.setOptions({
      title: name,
      headerShown: true,
      headerRight: () => (
        <Ionicons name={'trash-outline'} size={24} onPress={deleteProof} />
      ),
    })
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        const creds = await agent.proofs.getRequestedCredentialsForProofRequest(
          id
        )
        const requestedCredentials =
          agent.proofs.autoSelectCredentialsForProofRequest(creds)
          console.log(requestedCredentials)

        const formattedCredentials = formatRequestedCredentials(
          record,
          requestedCredentials
        )
        if (formattedCredentials.length === 0) {
          Alert.alert('Proof contains zero attributes')
          void agent.proofs.deleteById(id)
          navigation.goBack()
          return
        } else {
          setFields(formattedCredentials)
        }
      } catch (e) {
        toast.show({
          placement: 'top',
          title: e.toString(),
          background: colors.error[500],
        })
        deleteProof()
      }
    })()
  }, [])

  const deleteProof = () => {
    const onConfirm = () => {
      void _deleteProof(agent, id)
      navigation.goBack()
    }

    Alert.alert('Delete', 'Are you sure you want to delete the proof?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Confirm', style: 'destructive', onPress: onConfirm },
    ])
  }

  const onDeclineProof = () => {
    try {
      const onConfirm = async () => {
        await declineProof(agent, id)
        navigation.goBack()
      }
      Alert.alert('Decline', 'Are you sure you want to decline the proof?', [
        { style: 'cancel', text: 'cancel' },
        { style: 'destructive', onPress: onConfirm, text: 'confirm' },
      ])
    } catch (e) {
      console.error(e)
      toast.show({
        placement: 'top',
        title: 'Something went wrong while declining the proof',
        background: colors.error[500],
      })
    }
  }

  const onAcceptProof = async () => {
    try {
      acceptProof(agent, id)
      navigation.goBack()
    } catch (e) {
      console.error(e)
      toast.show({
        placement: 'top',
        title: 'Something went wrong while accepting the proof',
        background: colors.error[500],
      })
    }
    navigation.goBack()
  }

  const showCredentialInfo = (id: string) => Alert.alert(`Credential id: ${id}`)

  return (
    <>
      <FlatList
        data={fields}
        keyExtractor={(item) => item.name}
        renderItem={({ item: { name, value, id, isPredicate } }) => (
          <ListItem
            title={name}
            subtitle={value}
            onPress={() => showCredentialInfo(id)}
            subtitleColor={isPredicate ? 'success.500' : 'coolGray.600'}
          />
        )}
      />
      {record.state === ProofState.RequestReceived && (
        <Box
          flexDir="row"
          h={95}
          padding="2"
          backgroundColor={colors.tertiary[100]}
          paddingBottom={4}
        >
          <Pressable flex={1} onPress={onDeclineProof}>
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
          <Pressable flex={1} onPress={onAcceptProof}>
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
