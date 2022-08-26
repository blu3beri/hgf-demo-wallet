import React, { PropsWithChildren } from 'react'
import { Box, HStack, Pressable, VStack, Text } from 'native-base'

type ListItemProps = {
  title: string
  subtitle: string
  subtitleColor?: string
  onPress?: () => void
}

export const ListItem: React.FC<PropsWithChildren<ListItemProps>> = ({
  title,
  subtitle,
  onPress,
  subtitleColor = "coolGray.600",
  children,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Box
        borderBottomWidth="1"
        borderColor="secondary.200"
        pl="4"
        pr="5"
        py="3"
      >
        <HStack space={2}>
          {children}
          <VStack>
            <Text
              color="coolGray.800"
              bold
              fontSize={16}
            >
              {title}
            </Text>
            <Text
              color={subtitleColor}
              _dark={{
                color: 'warmGray.200',
              }}
            >
              {subtitle}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  )
}
