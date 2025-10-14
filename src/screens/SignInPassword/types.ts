import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {AuthNavigatorParamsList} from 'core/types';

export type SignInPasswordScreenNavigationProps = NativeStackNavigationProp<
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
