import {StackNavigationProp} from '@react-navigation/stack';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {MainNavigatorParamsList, ProfileNavigatorParamsList} from 'core/types';

export type ProfileScreenNavigationProps = CompositeNavigationProp<
  StackNavigationProp<ProfileNavigatorParamsList, 'Profile'>,
  StackNavigationProp<MainNavigatorParamsList>
>;

export type ProfileScreenRouteProps = RouteProp<
  ProfileNavigatorParamsList,
  'Profile'
>;

export interface IProps {
  navigation: ProfileScreenNavigationProps;
  route: ProfileScreenRouteProps;
}
