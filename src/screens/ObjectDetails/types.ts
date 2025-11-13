import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import {
  HomeNavigatorParamsList,
  TabNavigatorParamsList,
  MainNavigatorParamsList,
} from 'core/types';
import { ColorSchemeName } from 'react-native';

export type ObjectDetailsScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<HomeNavigatorParamsList, 'ObjectDetails'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<TabNavigatorParamsList>,
    NativeStackNavigationProp<MainNavigatorParamsList>
  >
>;

export type ObjectDetailsScreenRouteProps = RouteProp<
  HomeNavigatorParamsList,
  'ObjectDetails'
>;

export interface IProps {
  navigation: ObjectDetailsScreenNavigationProps;
  route: ObjectDetailsScreenRouteProps;
}
export type ScreenOptions = (
  theme: ColorSchemeName,
) => (props: IProps) => NativeStackNavigationOptions;
