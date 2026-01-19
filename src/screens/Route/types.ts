import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RoutesNavigatorParamsList } from 'core/types';

export type RouteDetailsScreenNavigationProps = NativeStackNavigationProp<
  RoutesNavigatorParamsList,
  'RouteDetails'
>;

export type RouteDetailsScreenRouteProps = RouteProp<
  RoutesNavigatorParamsList,
  'RouteDetails'
>;
