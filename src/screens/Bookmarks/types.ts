import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, CompositeNavigationProp} from '@react-navigation/native';
import {
  MainNavigatorParamsList,
  BookmarksNavigatorParamsList,
} from 'core/types';

export type ObjectsListScreenNavigationProps = CompositeNavigationProp<
  StackNavigationProp<BookmarksNavigatorParamsList, 'Bookmarks'>,
  StackNavigationProp<MainNavigatorParamsList>
>;

export type ObjectsListScreenRouteProps = RouteProp<
  BookmarksNavigatorParamsList,
  'Bookmarks'
>;

export interface IProps {
  navigation: ObjectsListScreenNavigationProps;
  route: ObjectsListScreenRouteProps;
}
