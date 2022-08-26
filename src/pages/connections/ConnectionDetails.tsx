import React, { useEffect } from 'react'
import { FlatList } from 'native-base'
import { useStackNavigation } from '../../hooks'
import { useAgent, useConnectionById } from '@aries-framework/react-hooks'
import { SafeAreaView, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ListItem } from '../../components'

export type ConnectionDetailsRouteParams = {
  id: string
}

type ConnectionDetailProps = {
  route: { params: ConnectionDetailsRouteParams }
}

export const ConnectionDetails: React.FC<ConnectionDetailProps> = ({
  route,
}) => {
  const {
    params: { id },
  } = route

  const navigation = useStackNavigation()
  const record = useConnectionById(id)
  const { agent } = useAgent()

  useEffect(() => {
    navigation.setOptions({
      title: record.theirLabel ?? 'Contact',
      headerShown: true,
      headerRight: () => (
        <Ionicons name={'trash-outline'} size={24} onPress={deleteConnection} />
      ),
    })
  }, [])

  const deleteConnection = () => {
    const onConfirm = () => {
      void agent.connections.deleteById(id)
      navigation.goBack()
    }

    Alert.alert('Delete', 'Are you sure you want to delete the connection?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Confirm', style: 'destructive', onPress: onConfirm },
    ])
  }

  return (
    <SafeAreaView>
      <FlatList
        data={Object.entries(record)}
        renderItem={({ item: [key, value] }) => (
          <ListItem title={key} subtitle={JSON.stringify(value)} />
        )}
      />
    </SafeAreaView>
  )
}
