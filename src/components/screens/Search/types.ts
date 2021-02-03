import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {HomeNavigatorParamsList} from 'core/types';

export type SearchScreenNavigationProps = StackNavigationProp<
  HomeNavigatorParamsList,
  'Search'
>;

export type SearchScreenRouteProps = RouteProp<
  HomeNavigatorParamsList,
  'Search'
>;

export interface IProps {
  navigation: SearchScreenNavigationProps;
  route: SearchScreenRouteProps;
}
