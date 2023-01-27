import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {AuthNavigatorParamsList} from 'core/types';

export type AuthMethodSelectionScreenNavigationProps = StackNavigationProp<
  AuthNavigatorParamsList,
  'AuthMethodSelection'
>;

export type AuthMethodSelectionScreenRouteProps = RouteProp<
  AuthNavigatorParamsList,
  'AuthMethodSelection'
>;

export interface IProps {
  navigation: AuthMethodSelectionScreenNavigationProps;
  route: AuthMethodSelectionScreenRouteProps;
}
