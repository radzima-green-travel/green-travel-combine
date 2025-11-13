import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { HomeNavigatorParamsList } from 'core/types';

export type CategoriesListScreenNavigationProps = NativeStackNavigationProp<
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
