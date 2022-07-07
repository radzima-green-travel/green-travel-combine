import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {ProfileNavigatorParamsList} from 'core/types';

export type NewPasswordScreenNavigationProps = StackNavigationProp<
  ProfileNavigatorParamsList,
  'NewPassword'
>;

export type NewPasswordScreenRouteProps = RouteProp<
  ProfileNavigatorParamsList,
  'NewPassword'
>;

export interface IProps {
  navigation: NewPasswordScreenNavigationProps;
  route: NewPasswordScreenRouteProps;
}
