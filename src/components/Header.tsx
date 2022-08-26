import { Ionicons } from '@expo/vector-icons'
import { Box, Text, useTheme } from 'native-base'
import React from 'react'

type HeaderProps = {
  title: string
  onPressIcon: () => void
}

export const Header: React.FC<HeaderProps> = ({ title, onPressIcon }) => {
  const { colors } = useTheme()

  return (
    <Box height={130}>
      <Text
        bold
        style={{ position: 'absolute', bottom: 7 }}
        pl={5}
        fontSize="3xl"
        color="black"
      >
        {title}
      </Text>
      <Ionicons
        onPress={onPressIcon}
        size={30}
        color="black"
        name="qr-code-outline"
        style={{
          position: 'absolute',
          right: 0,
          bottom: 7,
          paddingBottom: 7,
          paddingRight: 15,
        }}
      />
    </Box>
  )
}
