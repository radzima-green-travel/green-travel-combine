import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp, CompositeNavigationProp} from '@react-navigation/native';
import {
  HomeNavigatorParamsList,
  TabNavigatorParamsList,
  MainNavigatorParamsList,
} from 'core/types';

export type ObjectDetailsScreenNavigationProps = CompositeNavigationProp<
  StackNavigationProp<HomeNavigatorParamsList, 'ObjectDetails'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<TabNavigatorParamsList>,
    StackNavigationProp<MainNavigatorParamsList>
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
