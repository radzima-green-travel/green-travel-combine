import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, CompositeNavigationProp} from '@react-navigation/native';
import {
  TabAuthNavigatorParamsList,
  ProfileNavigatorParamsList,
} from 'core/types';

export type SignInScreenNavigationProps = CompositeNavigationProp<
  StackNavigationProp<TabAuthNavigatorParamsList, 'SignIn'>,
  StackNavigationProp<ProfileNavigatorParamsList, 'RestorePassword'>
>;

export type SignInScreenRouteProps = RouteProp<
  TabAuthNavigatorParamsList,
  'SignIn'
>;

export interface IProps {
  navigation: SignInScreenNavigationProps;
  route: SignInScreenRouteProps;
}
