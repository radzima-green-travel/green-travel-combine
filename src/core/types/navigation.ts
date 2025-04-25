import type {RouteProp} from '@react-navigation/core';
import type {ParamListBase} from '@react-navigation/routers';
import {ObjectListFilters} from './objectsList';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

type QueryParams<T extends string> = Record<T, string>;

// TODO: [Expo Router] Optional and required params
export namespace RouteQueryParams {
  export type ObjectDetails = QueryParams<
    | 'objectId'
    | 'objectCoverImageUrl'
    | 'objcetCoverBlurhash'
    | 'fromScreenName'
  >;

  export type ObjectDetailsMap = QueryParams<'objectId'>;

  export type ObjectDetailsAddInfo = QueryParams<'objectId' | 'fromScreenName'>;

  export type CategoryList = QueryParams<'categoryId' | 'title'>;

  export type Search = QueryParams<'filtersToApply'>;

  export type ObjectList = QueryParams<'title' | keyof ObjectListFilters>;

  export type WebView = QueryParams<'url' | 'title'>;

  export type Filter = QueryParams<
    'initialFilters' | 'initialQuery' | 'searchOptions' | 'fromScreenName'
  >;

  export type ImageGallery = QueryParams<'images' | 'initialIndex'>;

  export type SignInPassword = QueryParams<'email'>;
  export type SignUpForm = QueryParams<'email'>;
  export type CodeVerification = QueryParams<'email' | 'isSignUp'>;
  export type NewPassword = QueryParams<'email' | 'tempPassword'>;
  export type EmailValidation = QueryParams<'email' | 'isSignUp'>;

  export type Settlements = QueryParams<
    'initialSelectedSettlements' | 'regionsToInclude' | 'regionsSelectedNames'
  >;
}

export type ScreenOptions = NativeStackNavigationOptions;

export type ScreenOptionsFactory = (props: {
  route: RouteProp<ParamListBase, string>;
  navigation: any;
}) => NativeStackNavigationOptions;
