import {Animated} from 'react-native';

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
  CategoriesList: {
    categoryId: string;
    title: string;
  };
  ObjectDetails: {objectId: string; animatedValue?: Animated.Value};
};

export type BookmarksNavigatorParamsList = {
  Bookmarks: undefined;
  BookmarksList: {title: string; categoryId: string};
  ObjectDetails: {
    objectId: string;
    animatedValue?: Animated.Value;
  };
  ObjectsList: {
    categoryId: string;
    title: string;
    objectsIds?: string[];
  };
};

export type ProfileNavigatorParamsList = {
  Profile: undefined;
  ProfileDetails: undefined;
  ProfileSettingsLanguage: undefined;
  ProfileSettingsTheme: undefined;
};

export type AppMapNavigatorParamsList = {
  AppMap: undefined;
  ObjectDetails: {
    objectId: string;
    animatedValue?: Animated.Value;
  };
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
  Splash: undefined;
  ObjectDetailsMap: {objectId: string; categoryId: string};
  AuthNavigator: NestedNavigatorParams<AuthNavigatorParamsList>;
};

export type TabNavigatorParamsList = {
  HomeNavigator: NestedNavigatorParams<HomeNavigatorParamsList>;
  AppMapNavigator: NestedNavigatorParams<AppMapNavigatorParamsList>;
  BookmarksNavigator: NestedNavigatorParams<BookmarksNavigatorParamsList>;
  ProfileNavigator: NestedNavigatorParams<ProfileNavigatorParamsList>;
};

export type AuthNavigatorParamsList = {
  CheckEmail: undefined;
  SignInPassword: {
    email: string;
  };
  SignUpForm: {
    email: string;
  };
  CodeVerification: {email: string; isSignUp: true};
  RestorePassword: undefined;
  NewPassword: {
    email: string;
    code: string;
  };
  EmailValidation: {
    email: string;
    isSignUp: boolean;
  };
};
