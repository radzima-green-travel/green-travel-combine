import { Animated } from 'react-native';
import { NavigatorScreenParams } from '@react-navigation/native';
import { IObject, IObjectIncompleteField } from './common';
import { AnalyticsNavigationScreenNames } from './analytics';
import { FromScreenName } from './analytics/objectDetails';
import { SearchFilters } from './filters';
import { SearchOptions } from './search';
import type { ObjectListViewMode } from '../../components/types';
import { Routes } from '@features/routes';

export type ObjectDetailsParams = {
  objectId: string;
  objectCoverImageUrl: string;
  objcetCoverBlurhash: string | null;
  animatedValue?: Animated.Value;
  analytics?: {
    fromScreenName: AnalyticsNavigationScreenNames;
  };
};

type ObjectListParams = {
  title?: string;
  appliedFilters?: SearchFilters;
  showsTitle?: boolean;
  defaultViewMode?: ObjectListViewMode;
};

export type HomeNavigatorParamsList = {
  Home: undefined;
  Search?: ObjectListParams;
  ObjectsList: ObjectListParams;
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
  ObjectsList: ObjectListParams;
};

export type ProfileNavigatorParamsList = {
  Profile: undefined;
  ProfileDetails: undefined;
  ProfileSettingsLanguage: undefined;
  ProfileSettingsTheme: undefined;
  InAppWebView: { url: string; title: string };
  ObjectDetails: ObjectDetailsParams;
  ObjectsList: ObjectListParams;
};

export type ExploreNavigatorParamsList = {
  Explore: ObjectListParams;
  ObjectDetails: ObjectDetailsParams;
  ObjectsList: ObjectListParams;
};

export type MainNavigatorParamsList = {
  TabNavigator: NavigatorScreenParams<TabNavigatorParamsList>;
  PlaceDetails: undefined;
  PageNotFoundErrorScreen: undefined;
  Splash: undefined;
  ObjectDetailsMap: { object: IObject };
  AuthNavigator: NavigatorScreenParams<AuthNavigatorParamsList> & {
    onSuccessSignIn?: () => void;
  };
  Filter: {
    initialFilters?: SearchFilters;
    initialQuery?: string;
    searchOptions?: SearchOptions;
    analytics: {
      fromScreenName: AnalyticsNavigationScreenNames;
    };
    onApply?: (filters: SearchFilters) => { redirectHandled: boolean };
  };
  Settlements: {
    initialSelectedSettlements: string[];
    regionsToInclude: string[];
    analytics: {
      regionsSelectedNames: string[];
    };
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
  AddNewPlace: undefined;
};

export type TabNavigatorParamsList = {
  HomeNavigator: NavigatorScreenParams<HomeNavigatorParamsList>;
  ExploreNavigator: NavigatorScreenParams<ExploreNavigatorParamsList>;
  RoutesNavigator: NavigatorScreenParams<Routes.NavigatorParamsList>;
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
  CodeVerification: { email: string; isSignUp: true };
  RestorePassword: undefined;
  NewPassword: {
    email: string;
    tempPassword: string;
  };
  EmailValidation: {
    email: string;
    isSignUp: boolean;
  };
  AuthMethodSelection:
    | {
        title?: string;
      }
    | undefined;
  InAppWebView: { url: string; title: string };
  ChangePassword: undefined;
};

export type NavigationRoutes =
  | keyof MainNavigatorParamsList
  | keyof TabNavigatorParamsList
  | keyof AuthNavigatorParamsList
  | keyof HomeNavigatorParamsList
  | keyof BookmarksNavigatorParamsList
  | keyof ProfileNavigatorParamsList
  | keyof ExploreNavigatorParamsList
  | keyof Routes.NavigatorParamsList;
