import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {ProfileNavigatorParamsList} from 'core/types';

export type AuthentificationScreenNavigationProps = StackNavigationProp<
  ProfileNavigatorParamsList,
  'Authentification'
>;

export type AuthentificationScreenRouteProps = RouteProp<
  ProfileNavigatorParamsList,
  'Authentification'
>;

export interface IProps {
  navigation: AuthentificationScreenNavigationProps;
  route: AuthentificationScreenRouteProps;
}
