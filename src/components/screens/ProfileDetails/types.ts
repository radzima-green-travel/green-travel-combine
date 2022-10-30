import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {ProfileNavigatorParamsList} from 'core/types';

export type ProfileDetailsScreenNavigationProps = StackNavigationProp<
  ProfileNavigatorParamsList,
  'ProfileDetails'
>;

export type ProfileDetailsScreenRouteProps = RouteProp<
  ProfileNavigatorParamsList,
  'ProfileDetails'
>;

export interface IProps {
  navigation: ProfileDetailsScreenNavigationProps;
  route: ProfileDetailsScreenRouteProps;
}
