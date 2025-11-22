import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AuthNavigatorParamsList } from 'core/types';

export type EmailValidationScreenNavigationProps = NativeStackNavigationProp<
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
