import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MainNavigatorParamsList } from 'core/types';

export type ObjectDetailsMapScreenNavigationProps = NativeStackNavigationProp<
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
