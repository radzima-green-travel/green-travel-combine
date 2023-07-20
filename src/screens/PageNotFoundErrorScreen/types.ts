import {
  StackNavigationProp,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {MainNavigatorParamsList} from 'core/types';

export type PageNotFoundErrorScreenNavigationProps = StackNavigationProp<
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

export type ScreenOptions = (props: IProps) => StackNavigationOptions;
