import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {ProfileNavigatorParamsList} from 'core/types';

export type ProfileScreenNavigationProps = StackNavigationProp<
  ProfileNavigatorParamsList,
  'Profile'
>;

export type ProfileScreenRouteProps = RouteProp<
  ProfileNavigatorParamsList,
  'Profile'
>;

export interface IProps {
  navigation: ProfileScreenNavigationProps;
  route: ProfileScreenRouteProps;
}
