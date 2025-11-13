import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AuthNavigatorParamsList } from 'core/types';

export type RestorePasswordScreenNavigationProps = NativeStackNavigationProp<
  AuthNavigatorParamsList,
  'RestorePassword'
>;

export type RestorePasswordScreenRouteProps = RouteProp<
  AuthNavigatorParamsList,
  'RestorePassword'
>;

export interface IProps {
  navigation: RestorePasswordScreenNavigationProps;
  route: RestorePasswordScreenRouteProps;
}
