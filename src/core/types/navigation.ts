import {IObject} from './common';

export type HomeNavigatorParamsList = {
  Home: undefined;
  Search: undefined;
  ObjectsList: {data: IObject[]; title: string};
  RouteDetails: undefined;
};

export type BookmarksNavigatorParamsList = {
  Bookmarks: undefined;
};

export type AppMapNavigatorParamsList = {
  AppMap: undefined;
};

export type MainNavigatorParamsList = {
  TabNavigator: undefined;
  PlaceDetails: undefined;
};

export type TabNavigatorParamsList = {
  HomeNavigator: undefined;
  AppMapNavigator: undefined;
  BookmarksNavigator: undefined;
};
