import {
  NativeStackNavigationProp,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MainNavigatorParamsList } from 'core/types';

export type PageNotFoundErrorScreenNavigationProps = NativeStackNavigationProp<
  MainNavigatorParamsList,
  'PageNotFoundErrorScreen'
>;

export type PageNotFoundErrorScreenRouteProps = RouteProp<
  MainNavigatorParamsList,
  'PageNotFoundErrorScreen'
>;

export interface IProps {
  navigation: PageNotFoundErrorScreenNavigationProps;
  route: PageNotFoundErrorScreenRouteProps;
}

export type ScreenOptions = (props: IProps) => NativeStackNavigationOptions;
