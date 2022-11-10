import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {AuthNavigatorParamsList} from 'core/types';

export type RestorePasswordScreenNavigationProps = StackNavigationProp<
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
