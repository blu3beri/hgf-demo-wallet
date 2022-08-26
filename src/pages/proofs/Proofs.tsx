import { FlatList } from 'native-base'
import React from 'react'
import { useProofs } from '@aries-framework/react-hooks'
import { NoContent } from '../../components/NoContent'
import { ListItem } from '../../components/ListItem'
import { useStackNavigation } from '../../hooks'

export const Proofs = () => {
  const { records } = useProofs()
  const navigation = useStackNavigation()

  if (records.length === 0) {
    return <NoContent title="You have zero proofs" />
  }

  const onShowDetails = (id: string) => {
    navigation.navigate('ProofDetails', { id })
  }

  return (
    <FlatList
      data={records}
      renderItem={({ item }) => (
        <ListItem

          title={item.requestMessage?.indyProofRequest.name ?? item.id}
          subtitle={item.state}
          onPress={() => onShowDetails(item.id)}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  )
}
