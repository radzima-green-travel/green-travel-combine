import {Animated} from 'react-native';
import {NavigatorScreenParams} from '@react-navigation/native';
import {IObject, IObjectIncompleteField} from './common';
import {AnalyticsNavigationScreenNames} from './analytics';
import {FromScreenName} from './analytics/objectDetails';

type ObjectDetailsParams = {
  objectId: string;
  objectCoverImageUrl: string;
  objcetCoverBlurhash: string | null;
  animatedValue?: Animated.Value;
  analytics?: {
    fromScreenName: AnalyticsNavigationScreenNames;
  };
};

export type HomeNavigatorParamsList = {
  Home: undefined;
  Search: undefined;
  Filter: undefined;
  Settlements: {
    initialSelectedSettlements: string[];
    regionsToInclude: string[];
  };
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

type BookmarksListParams = {
  title: string;
  categoryId: string;
  objectsIds: string[];
};

export type BookmarksNavigatorParamsList = {
  Bookmarks: undefined;
  BookmarksList: BookmarksListParams;
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
  ObjectDetailsMap: {object: IObject};
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
