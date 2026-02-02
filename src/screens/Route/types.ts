import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Routes } from '@features/routes';

export type RouteDetailsScreenNavigationProps = NativeStackNavigationProp<
  Routes.NavigatorParamsList,
  'Route'
>;

export type RouteDetailsScreenRouteProps = RouteProp<
  Routes.NavigatorParamsList,
  'Route'
>;
