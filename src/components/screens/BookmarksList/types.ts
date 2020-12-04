import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {BookmarksNavigatorParamsList} from 'core/types';

export type BookmarksListScreenNavigationProps = StackNavigationProp<
  BookmarksNavigatorParamsList,
  'BookmarksList'
>;

export type BookmarksListScreenRouteProps = RouteProp<
  BookmarksNavigatorParamsList,
  'BookmarksList'
>;

export interface IProps {
  navigation: BookmarksListScreenNavigationProps;
  route: BookmarksListScreenRouteProps;
}
