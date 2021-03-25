import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {MainNavigatorParamsList} from 'core/types';

export type ObjectDetailsMapScreenNavigationProps = StackNavigationProp<
  MainNavigatorParamsList,
  'ObjectDetailsMap'
>;

export type ObjectDetailsMapScreenRouteProps = RouteProp<
  MainNavigatorParamsList,
  'ObjectDetailsMap'
>;

export interface IProps {
  navigation: ObjectDetailsMapScreenNavigationProps;
  route: ObjectDetailsMapScreenRouteProps;
}
