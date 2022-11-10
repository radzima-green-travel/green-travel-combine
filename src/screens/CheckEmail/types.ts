import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {AuthNavigatorParamsList} from 'core/types';

export type CheckEmailScreenNavigationProps = StackNavigationProp<
  AuthNavigatorParamsList,
  'CheckEmail'
>;

export type CheckEmailScreenRouteProps = RouteProp<
  AuthNavigatorParamsList,
  'CheckEmail'
>;

export interface IProps {
  navigation: CheckEmailScreenNavigationProps;
  route: CheckEmailScreenRouteProps;
}
