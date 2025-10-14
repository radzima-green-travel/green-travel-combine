import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {AuthNavigatorParamsList} from 'core/types';

export type SignUpFormScreenNavigationProps = NativeStackNavigationProp<
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
