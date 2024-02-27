import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  HomeNavigatorParamsList,
  MainNavigatorParamsList,
  TabNavigatorParamsList,
} from 'core/types';

export type ObjectDetailsAddInfoScreenNavigationProps = CompositeNavigationProp<
  StackNavigationProp<HomeNavigatorParamsList, 'ObjectDetailsAddInfo'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<TabNavigatorParamsList>,
    StackNavigationProp<MainNavigatorParamsList>
  >
>;

export type ObjectDetailsAddInfoScreenRouteProps = RouteProp<
  HomeNavigatorParamsList,
  'ObjectDetailsAddInfo'
>;
