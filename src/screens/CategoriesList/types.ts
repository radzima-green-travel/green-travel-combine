import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {HomeNavigatorParamsList} from 'core/types';

export type CategoriesListScreenNavigationProps = StackNavigationProp<
  HomeNavigatorParamsList,
  'CategoriesList'
>;

export type CategoriesListScreenRouteProps = RouteProp<
  HomeNavigatorParamsList,
  'CategoriesList'
>;

export interface IProps {
  navigation: CategoriesListScreenNavigationProps;
  route: CategoriesListScreenRouteProps;
}
