import {StackNavigationProp} from '@react-navigation/stack';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp, CompositeNavigationProp} from '@react-navigation/native';
import {
  HomeNavigatorParamsList,
  TabNavigatorParamsList,
  MainNavigatorParamsList,
} from 'core/types';

export type HomeScreenNavigationProps = CompositeNavigationProp<
  StackNavigationProp<HomeNavigatorParamsList, 'Settlements'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<TabNavigatorParamsList>,
    StackNavigationProp<MainNavigatorParamsList>
  >
>;

export type SettlementsScreenRouteProps = RouteProp<
  HomeNavigatorParamsList,
  'Settlements'
>;

export interface IProps {
  navigation: HomeScreenNavigationProps;
  route: SettlementsScreenRouteProps;
}

export type ScreenOptions = (props: IProps) => NativeStackNavigationOptions;
