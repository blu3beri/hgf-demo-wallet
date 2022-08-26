import { CredentialExchangeRecord } from '@aries-framework/core'
import { useAgent, useCredentials } from '@aries-framework/react-hooks'
import { Ionicons } from '@expo/vector-icons'
import { FlatList, useTheme } from 'native-base'
import React, { useEffect, useState } from 'react'
import { ListItem } from '../../components/ListItem'
import { NoContent } from '../../components/NoContent'
import { useStackNavigation } from '../../hooks'
import { formatSchemaName } from '../../utils'

export const Credentials = () => {
  const { agent } = useAgent()
  const { colors } = useTheme()
  const { records } = useCredentials()
  const navigation = useStackNavigation()
  const [names, setNames] = useState([])
  const [attributes, setAttributes] = useState([])

  useEffect(() => {
    const run = async () => {
      for (const record of records) {
        const data = await agent.credentials.getFormatData(record.id)
        const newAttributes = {}
        data.offerAttributes?.forEach(
          ({ name, value }) => (newAttributes[name] = value)
        )

        setNames([...names, formatSchemaName(data.offer?.indy?.schema_id)])
        setAttributes([...attributes, newAttributes])
      }
    }
    void run()
  }, [records])

  const onShowDetails = async (
    record: CredentialExchangeRecord,
    idx: number
  ) => {
    navigation.navigate('CredentialDetails', {
      name: names[idx],
      attributes: attributes[idx],
      id: record.id,
    })
  }

  if (records.length === 0) {
    return <NoContent title="You have zero credentials" />
  }

  return (
    <FlatList
      data={records}
      renderItem={({ item, index }) => (
        <ListItem
          onPress={() => onShowDetails(item, index)}
          title={names[index] ?? 'Unknown credential'}
          subtitle={item.state}
        >
          <Ionicons size={50} name="document-outline" color={colors.primary[500]} />
        </ListItem>
      )}
      keyExtractor={(item) => item.id}
    />
  )
}
