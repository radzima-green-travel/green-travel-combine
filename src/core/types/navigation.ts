export type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
    ? {screen: K; params?: ParamList[K]}
    : {screen: K; params: ParamList[K]};
}[keyof ParamList];

export type HomeNavigatorParamsList = {
  Home: undefined;
  Search: undefined;
  RouteDetails: undefined;
  ObjectsList: {categoryId: string; title: string};
};

export type BookmarksNavigatorParamsList = {
  Bookmarks: undefined;
  BookmarksList: {title: string; categoryId: string};
};

export type AppMapNavigatorParamsList = {
  AppMap: undefined;
};

export type MainNavigatorParamsList = {
  TabNavigator: NestedNavigatorParams<TabNavigatorParamsList>;
  PlaceDetails: undefined;
  ErrorScreen: undefined;
};

export type TabNavigatorParamsList = {
  HomeNavigator: NestedNavigatorParams<HomeNavigatorParamsList>;
  AppMapNavigator: NestedNavigatorParams<AppMapNavigatorParamsList>;
  BookmarksNavigator: NestedNavigatorParams<BookmarksNavigatorParamsList>;
};
