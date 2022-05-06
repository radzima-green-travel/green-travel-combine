import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, CompositeNavigationProp} from '@react-navigation/native';
import {
  ProfileNavigatorParamsList,
  TabAuthNavigatorParamsList,
} from 'core/types';

export type SignUpScreenNavigationProps = CompositeNavigationProp<
  StackNavigationProp<TabAuthNavigatorParamsList, 'SignUp'>,
  StackNavigationProp<ProfileNavigatorParamsList, 'EmailValidation'>
>;

export type SignUpScreenRouteProps = RouteProp<
  TabAuthNavigatorParamsList,
  'SignUp'
>;

export interface IProps {
  navigation: SignUpScreenNavigationProps;
  route: SignUpScreenRouteProps;
}
