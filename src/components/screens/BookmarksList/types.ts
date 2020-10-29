import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {MainNavigatorParamsList} from 'core/types';

export type BookmarksListScreenNavigationProps = StackNavigationProp<
  MainNavigatorParamsList,
  'BookmarksList'
>;

export type BookmarksListScreenRouteProps = RouteProp<
  MainNavigatorParamsList,
  'BookmarksList'
>;

export interface IProps {
  navigation: BookmarksListScreenNavigationProps;
  route: BookmarksListScreenRouteProps;
}
