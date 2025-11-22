import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainNavigatorParamsList } from 'core/types';

export type ObjectDetailsAddInfoScreenNavigationProps =
  NativeStackNavigationProp<MainNavigatorParamsList, 'ObjectDetailsAddInfo'>;

export type ObjectDetailsAddInfoScreenRouteProps = RouteProp<
  MainNavigatorParamsList,
  'ObjectDetailsAddInfo'
>;
