import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AuthNavigatorParamsList } from 'core/types';

export type AuthMethodSelectionScreenNavigationProps =
  NativeStackNavigationProp<AuthNavigatorParamsList, 'AuthMethodSelection'>;

export type AuthMethodSelectionScreenRouteProps = RouteProp<
  AuthNavigatorParamsList,
  'AuthMethodSelection'
>;

export interface IProps {
  navigation: AuthMethodSelectionScreenNavigationProps;
  route: AuthMethodSelectionScreenRouteProps;
}
