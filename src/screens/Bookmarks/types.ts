import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import {
  MainNavigatorParamsList,
  BookmarksNavigatorParamsList,
} from 'core/types';

export type ObjectsListScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<BookmarksNavigatorParamsList, 'Bookmarks'>,
  NativeStackNavigationProp<MainNavigatorParamsList>
>;

export type ObjectsListScreenRouteProps = RouteProp<
  BookmarksNavigatorParamsList,
  'Bookmarks'
>;

export interface IProps {
  navigation: ObjectsListScreenNavigationProps;
  route: ObjectsListScreenRouteProps;
}
