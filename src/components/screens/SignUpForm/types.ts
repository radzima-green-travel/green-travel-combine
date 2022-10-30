import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {AuthNavigatorParamsList} from 'core/types';

export type SignUpFormScreenNavigationProps = StackNavigationProp<
  AuthNavigatorParamsList,
  'SignUpForm'
>;

export type SignUpFormScreenRouteProps = RouteProp<
  AuthNavigatorParamsList,
  'SignUpForm'
>;

export interface IProps {
  navigation: SignUpFormScreenNavigationProps;
  route: SignUpFormScreenRouteProps;
}
