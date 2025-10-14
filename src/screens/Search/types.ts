import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp, CompositeNavigationProp} from '@react-navigation/native';
import {
  TabNavigatorParamsList,
  MainNavigatorParamsList,
  HomeNavigatorParamsList,
} from 'core/types';

export type SearchScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<HomeNavigatorParamsList, 'Search'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<TabNavigatorParamsList>,
    NativeStackNavigationProp<MainNavigatorParamsList>
  >
>;
export type SearchScreenRouteProps = RouteProp<
  HomeNavigatorParamsList,
  'Search'
>;

export interface IProps {
  navigation: SearchScreenNavigationProps;
  route: SearchScreenRouteProps;
  testID: string;
}

export type ScreenOptions = (
  props: Omit<IProps, 'testID'>,
) => NativeStackNavigationOptions;
