import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {ProfileNavigatorParamsList} from 'core/types';

export type EmailValidationScreenNavigationProps = StackNavigationProp<
  ProfileNavigatorParamsList,
  'EmailValidation'
>;

export type EmailValidationScreenRouteProps = RouteProp<
  ProfileNavigatorParamsList,
  'EmailValidation'
>;

export interface IProps {
  navigation: EmailValidationScreenNavigationProps;
  route: EmailValidationScreenRouteProps;
}
