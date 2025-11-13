import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { HomeNavigatorParamsList } from 'core/types';

export type ObjectsListScreenNavigationProps = NativeStackNavigationProp<
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
