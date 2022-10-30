import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {AuthNavigatorParamsList} from 'core/types';

export type EmailValidationScreenNavigationProps = StackNavigationProp<
  AuthNavigatorParamsList,
  'EmailValidation'
>;

export type EmailValidationScreenRouteProps = RouteProp<
  AuthNavigatorParamsList,
  'EmailValidation'
>;

export interface IProps {
  navigation: EmailValidationScreenNavigationProps;
  route: EmailValidationScreenRouteProps;
}
