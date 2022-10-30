import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {AuthNavigatorParamsList} from 'core/types';

export type SignInPasswordScreenNavigationProps = StackNavigationProp<
  AuthNavigatorParamsList,
  'SignInPassword'
>;

export type SignInPasswordScreenRouteProps = RouteProp<
  AuthNavigatorParamsList,
  'SignInPassword'
>;

export interface IProps {
  navigation: SignInPasswordScreenNavigationProps;
  route: SignInPasswordScreenRouteProps;
}
