import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {AuthNavigatorParamsList} from 'core/types';

export type NewPasswordScreenNavigationProps = StackNavigationProp<
  AuthNavigatorParamsList,
  'NewPassword'
>;

export type NewPasswordScreenRouteProps = RouteProp<
  AuthNavigatorParamsList,
  'NewPassword'
>;

export interface IProps {
  navigation: NewPasswordScreenNavigationProps;
  route: NewPasswordScreenRouteProps;
}
