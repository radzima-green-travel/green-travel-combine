import {Animated} from 'react-native';
import {NavigatorScreenParams} from '@react-navigation/native';
import {IObjectIncompleteField} from './common';
import {AnalyticsNavigationScreenNames} from './analytics';
import {FromScreenName} from './analytics/objectDetails';

type ObjectDetailsParams = {
  objectId: string;
  animatedValue?: Animated.Value;
  analytics?: {
    fromScreenName: AnalyticsNavigationScreenNames;
  };
};

export type HomeNavigatorParamsList = {
  Home: undefined;
  Search: undefined;
  Filter: undefined;
  ObjectsList: {
    categoryId: string;
    title: string;
    objectsIds?: string[];
  };
  CategoriesList: {
    categoryId: string;
    title: string;
  };
  ObjectDetails: ObjectDetailsParams;
};

export type BookmarksNavigatorParamsList = {
  Bookmarks: undefined;
  BookmarksList: {title: string; categoryId: string};
  ObjectDetails: ObjectDetailsParams;
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
  InAppWebView: {url: string; title: string};
  ObjectDetails: ObjectDetailsParams;
  ObjectsList: {
    categoryId: string;
    title: string;
    objectsIds?: string[];
  };
};

export type AppMapNavigatorParamsList = {
  AppMap: undefined;
  ObjectDetails: ObjectDetailsParams;
  ObjectsList: {
    categoryId: string;
    title: string;
    objectsIds?: string[];
  };
};

export type MainNavigatorParamsList = {
  TabNavigator: NavigatorScreenParams<TabNavigatorParamsList>;
  PlaceDetails: undefined;
  PageNotFoundErrorScreen: undefined;
  Splash: undefined;
  ObjectDetailsMap: {objectId: string; categoryId: string};
  AuthNavigator: NavigatorScreenParams<AuthNavigatorParamsList> & {
    onSuccessSignIn?: () => void;
  };
  ObjectDetails: ObjectDetailsParams;
  ObjectDetailsAddInfo: {
    objectId: string;
    objectName: string;
    incompleteFields: IObjectIncompleteField[];
    showSuccessMenu?: boolean;
    analytics?: {
      fromScreenName: FromScreenName;
    };
  };
  ImagesGallery: {
    images: string[];
    initialIndex: number;
  };
};

export type TabNavigatorParamsList = {
  HomeNavigator: NavigatorScreenParams<HomeNavigatorParamsList>;
  AppMapNavigator: NavigatorScreenParams<AppMapNavigatorParamsList>;
  BookmarksNavigator: NavigatorScreenParams<BookmarksNavigatorParamsList>;
  ProfileNavigator: NavigatorScreenParams<ProfileNavigatorParamsList>;
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
    tempPassword: string;
  };
  EmailValidation: {
    email: string;
    isSignUp: boolean;
  };
  AuthMethodSelection: undefined;
  InAppWebView: {url: string; title: string};
  ChangePassword: undefined;
};

export type NavigationRoutes =
  | keyof MainNavigatorParamsList
  | keyof TabNavigatorParamsList
  | keyof AuthNavigatorParamsList
  | keyof HomeNavigatorParamsList
  | keyof BookmarksNavigatorParamsList
  | keyof ProfileNavigatorParamsList
  | keyof AppMapNavigatorParamsList;
