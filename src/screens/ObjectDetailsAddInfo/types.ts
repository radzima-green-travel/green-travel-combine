import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainNavigatorParamsList} from 'core/types';

export type ObjectDetailsAddInfoScreenNavigationProps = StackNavigationProp<
  MainNavigatorParamsList,
  'ObjectDetailsAddInfo'
>;

export type ObjectDetailsAddInfoScreenRouteProps = RouteProp<
  MainNavigatorParamsList,
  'ObjectDetailsAddInfo'
>;
