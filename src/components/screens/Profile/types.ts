import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, CompositeNavigationProp} from '@react-navigation/native';
import {MainNavigatorParamsList, ProfileNavigatorParamsList} from 'core/types';

export type ObjectsListScreenNavigationProps = CompositeNavigationProp<
  StackNavigationProp<ProfileNavigatorParamsList, 'Profile'>,
  StackNavigationProp<MainNavigatorParamsList>
>;

export type ObjectsListScreenRouteProps = RouteProp<
  ProfileNavigatorParamsList,
  'Profile'
>;

export interface IProps {
  navigation: ObjectsListScreenNavigationProps;
  route: ObjectsListScreenRouteProps;
}
