import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {HomeNavigatorParamsList} from 'core/types';

export type ObjectsListScreenNavigationProps = StackNavigationProp<
  HomeNavigatorParamsList,
  'ObjectsList'
>;

export type ObjectsListScreenRouteProps = RouteProp<
  HomeNavigatorParamsList,
  'ObjectsList'
>;

export interface IProps {
  navigation: ObjectsListScreenNavigationProps;
  route: ObjectsListScreenRouteProps;
}
