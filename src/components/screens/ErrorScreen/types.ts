import {
  StackNavigationProp,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {MainNavigatorParamsList} from 'core/types';

export type ObjectsListScreenNavigationProps = StackNavigationProp<
  MainNavigatorParamsList,
  'ErrorScreen'
>;

export type ObjectsListScreenRouteProps = RouteProp<
  MainNavigatorParamsList,
  'ErrorScreen'
>;

export interface IProps {
  navigation: ObjectsListScreenNavigationProps;
  route: ObjectsListScreenRouteProps;
}

export type ScreenOptions = (props: IProps) => StackNavigationOptions;
