import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {AppMapNavigatorParamsList} from 'core/types';

export type ObjectsListScreenNavigationProps = StackNavigationProp<
  AppMapNavigatorParamsList,
  'AppMap'
>;

export type ObjectsListScreenRouteProps = RouteProp<
  AppMapNavigatorParamsList,
  'AppMap'
>;

export interface IProps {
  navigation: ObjectsListScreenNavigationProps;
  route: ObjectsListScreenRouteProps;
}
