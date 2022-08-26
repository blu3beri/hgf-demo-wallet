import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import type { StackParamList, TabParamList } from '../navigation/navigation'
import { useNavigation } from '@react-navigation/native'

export const useStackNavigation = () =>
  useNavigation<BottomTabNavigationProp<StackParamList>>()

export const useTabNavigation = () =>
  useNavigation<BottomTabNavigationProp<TabParamList>>()
