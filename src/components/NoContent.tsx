import { Ionicons } from '@expo/vector-icons'
import { Center, Text } from 'native-base'
import React from 'react'

type NoContentProps = {
  title: string
}

export const NoContent: React.FC<NoContentProps> = ({ title }) => {
  return (
    <Center flex={1}>
      <Ionicons name="sad-outline" size={100} />
      <Text bold size={30} textAlign="center" width="100%">
        {title}
      </Text>
    </Center>
  )
}
