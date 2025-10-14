import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {AuthNavigatorParamsList} from 'core/types';

export type NewPasswordScreenNavigationProps = NativeStackNavigationProp<
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
