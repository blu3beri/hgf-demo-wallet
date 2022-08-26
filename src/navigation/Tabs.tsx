import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { Text, useTheme } from 'native-base'
import { Proofs } from '../pages/proofs'
import { Credentials } from '../pages/credentials'
import { Connections } from '../pages/connections'
import { TabParamList } from './navigation'
import { useStackNavigation } from '../hooks'
import { Header } from '../components'

const getTabOptions = (
  title: 'Credentials' | 'Connections' | 'Proofs',
  iconName: 'wallet' | 'people' | 'ribbon'
): BottomTabNavigationOptions => {
  const { colors } = useTheme()
  const navigation = useStackNavigation()

  return {
    header: () => (
      <Header
        title={title}
        onPressIcon={() => navigation.navigate('BarcodeScanner')}
      />
    ),
    tabBarStyle: { paddingTop: 5, borderTopWidth: 0 },
    tabBarLabel: ({ focused }) => (
      <Text color={focused ? colors.tertiary[500] : colors.text[500]}>
        {title}
      </Text>
    ),
    tabBarIcon: ({ focused }) => (
      <Ionicons
        name={iconName}
        size={24}
        color={focused ? colors.tertiary[500] : colors.text[500]}
      />
    ),
  }
}

export const Tabs = () => {
  const Tab = createBottomTabNavigator<TabParamList>()
  return (
    <Tab.Navigator initialRouteName="Credentials">
      <Tab.Screen
        name="Contacts"
        component={Connections}
        options={getTabOptions('Connections', 'people')}
      />
      <Tab.Screen
        name="Credentials"
        component={Credentials}
        options={getTabOptions('Credentials', 'wallet')}
      />
      <Tab.Screen
        name="Proofs"
        component={Proofs}
        options={getTabOptions('Proofs', 'ribbon')}
      />
    </Tab.Navigator>
  )
}
