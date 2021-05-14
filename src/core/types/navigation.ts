export type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
    ? {screen: K; params?: ParamList[K]}
    : {screen: K; params: ParamList[K]};
}[keyof ParamList];

export type HomeNavigatorParamsList = {
  Home: undefined;
  Search: undefined;
  ObjectsList: {
    categoryId: string;
    title: string;
    objectsIds?: string[];
  };
  CategoriesList: {categoryId: string; title: string};
  ObjectDetails: {objectId: string};
};

export type BookmarksNavigatorParamsList = {
  Bookmarks: undefined;
  BookmarksList: {title: string; categoryId: string};
  ObjectDetails: {categoryId: string; objectId: string};
  ObjectsList: {
    categoryId: string;
    title: string;
    objectsIds?: string[];
  };
};

export type AppMapNavigatorParamsList = {
  AppMap: undefined;
  ObjectDetails: {categoryId: string; objectId: string};
  ObjectsList: {
    categoryId: string;
    title: string;
    objectsIds?: string[];
  };
};

export type MainNavigatorParamsList = {
  TabNavigator: NestedNavigatorParams<TabNavigatorParamsList>;
  PlaceDetails: undefined;
  ErrorScreen: undefined;
  ObjectDetailsMap: {objectId: string; categoryId: string};
};

export type TabNavigatorParamsList = {
  HomeNavigator: NestedNavigatorParams<HomeNavigatorParamsList>;
  AppMapNavigator: NestedNavigatorParams<AppMapNavigatorParamsList>;
  BookmarksNavigator: NestedNavigatorParams<BookmarksNavigatorParamsList>;
};
