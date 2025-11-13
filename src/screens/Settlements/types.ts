import {
  NativeStackNavigationProp,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { TabNavigatorParamsList, MainNavigatorParamsList } from 'core/types';

export type HomeScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<MainNavigatorParamsList, 'Settlements'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<TabNavigatorParamsList>,
    NativeStackNavigationProp<MainNavigatorParamsList>
  >
>;

export type SettlementsScreenRouteProps = RouteProp<
  MainNavigatorParamsList,
  'Settlements'
>;

export interface IProps {
  navigation: HomeScreenNavigationProps;
  route: SettlementsScreenRouteProps;
  testID: string;
}

export type ScreenOptions = (
  props: Omit<IProps, 'testID'>,
) => NativeStackNavigationOptions;
