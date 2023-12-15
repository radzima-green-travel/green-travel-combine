import {Animated} from 'react-native';
import {NavigatorScreenParams} from '@react-navigation/native';

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
  InAppWebView: {url: string; title: string};
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
  TabNavigator: NavigatorScreenParams<TabNavigatorParamsList>;
  PlaceDetails: undefined;
  PageNotFoundErrorScreen: undefined;
  Splash: undefined;
  ObjectDetailsMap: {objectId: string; categoryId: string};
  AuthNavigator: NavigatorScreenParams<AuthNavigatorParamsList> & {
    onSuccessSignIn?: () => void;
  };
  ObjectDetails: {
    objectId: string;
    animatedValue?: Animated.Value;
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
