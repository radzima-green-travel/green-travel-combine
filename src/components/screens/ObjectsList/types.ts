import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {MainNavigatorParamsList} from 'core/types';

export type ObjectsListScreenNavigationProps = StackNavigationProp<
  MainNavigatorParamsList,
  'ObjectsList'
>;

export type ObjectsListScreenRouteProps = RouteProp<
  MainNavigatorParamsList,
  'ObjectsList'
>;

export interface IProps {
  navigation: ObjectsListScreenNavigationProps;
  route: ObjectsListScreenRouteProps;
}
