import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import {
  MainNavigatorParamsList,
  ProfileNavigatorParamsList,
} from 'core/types';

export type ProfileScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<ProfileNavigatorParamsList, 'Profile'>,
  NativeStackNavigationProp<MainNavigatorParamsList>
>;

export type ProfileScreenRouteProps = RouteProp<
  ProfileNavigatorParamsList,
  'Profile'
>;

export interface IProps {
  navigation: ProfileScreenNavigationProps;
  route: ProfileScreenRouteProps;
}
