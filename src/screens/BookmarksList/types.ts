import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { BookmarksNavigatorParamsList } from 'core/types';

export type BookmarksListScreenNavigationProps = NativeStackNavigationProp<
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
