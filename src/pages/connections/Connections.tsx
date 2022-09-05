import { useConnections } from '@aries-framework/react-hooks'
import { Ionicons } from '@expo/vector-icons'
import { Avatar, FlatList, useTheme } from 'native-base'
import React from 'react'
import { Fab } from '../../components/Fab'
import { ListItem } from '../../components/ListItem'
import { NoContent } from '../../components/NoContent'
import { useStackNavigation } from '../../hooks'

export const Connections = () => {
  const navigation = useStackNavigation()
  const { records } = useConnections()
  const { colors } = useTheme()

  const onShowDetails = (id: string) =>
    navigation.navigate('ConnectionDetails', { id })

  if (records.length === 0) {
    return <NoContent title="You have zero connections" />
  }

  return (
    <>
      <FlatList
        data={records}
        renderItem={({ item }) => (
          <ListItem
            title={item.theirLabel ?? 'Unknown Contact'}
            subtitle={item.state}
            onPress={() => onShowDetails(item.id)}
          >
            {item.imageUrl ? (
              <Avatar
                background={colors.white}
                size={50}
                source={{
                  uri: item.imageUrl,
                }}
                mr="3"
              />
            ) : (
              <Ionicons
                size={50}
                name="person-circle"
                color={colors.gray[400]}
              />
            )}
          </ListItem>
        )}
        keyExtractor={(item) => item.id}
      />
      <Fab />
    </>
  )
}
