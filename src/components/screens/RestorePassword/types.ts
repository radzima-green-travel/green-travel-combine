import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {ProfileNavigatorParamsList} from 'core/types';

export type RestorePasswordScreenNavigationProps = StackNavigationProp<
  ProfileNavigatorParamsList,
  'RestorePassword'
>;

export type RestorePasswordScreenRouteProps = RouteProp<
  ProfileNavigatorParamsList,
  'RestorePassword'
>;

export interface IProps {
  navigation: RestorePasswordScreenNavigationProps;
  route: RestorePasswordScreenRouteProps;
}
