import {MultiPolygon, LineString} from '@turf/helpers';
import {IRequestError} from './errors';
export interface ILabelError {
  text: string;
  title: string;
  originalError: IRequestError | Error;
}

export type ICoordinates = Array<number>;

export interface ILocationPoint {
  lat: number | null;
  lon: number | null;
}

export interface IArea {
  totalArea: number;
  type: 'MultiPolygon';
  coordinates: ICoordinates[];
}

export interface IProhibition {
  id: string;
  name: string;
  key: string;
}

export interface IInclude {
  id: string;
  name: string;
  icon: string;
  objects: string[];
}
export interface IBelongsTo {
  id: string;
  name: string;
  icon: string;
  objects: string[];
}

export interface IObjectCategory {
  icon: string;
  id: string;
  name: string;
  parent: string | null;
  singularName: string;
}

export interface IOrigins {
  name: string;
  value: string;
}

export interface IObject {
  id: string;
  name: string;
  description: string;
  address: string;
  area?: MultiPolygon;
  location: ILocationPoint | null;
  category: IObjectCategory;
  cover: string;
  images: string[];
  prohibitions?: IProhibition[];
  include: IInclude[];
  belongsTo: IBelongsTo[];
  url?: string;
  origin?: string;
  origins?: IOrigins[];
  routes?: LineString;
  length: number | null;
  blurhash?: string;
}

export interface ICategory {
  id: string;
  path: string;
  name: string;
  singularName: string;
  icon: string;
  cover: string | null;
  parent?: string;
  updatedAt: string;
  fields: string[];
  objects: IObject[];
  children: ICategory[];
  blurhash?: string;
}

export interface ITransformedCategory
  extends Omit<ICategory, 'objects' | 'children'> {
  objects: string[];
  children: string[];
}

export interface ICategoriesMap {
  [key: string]: ITransformedCategory;
}

export interface IObejctsMap {
  [key: string]: IObject;
}
export interface IObejctsToCategoryMap {
  [key: string]: string;
}
export interface ITransformedData {
  categories: ITransformedCategory[];
  objectsMap: IObejctsMap;
  categoriesMap: ICategoriesMap;
  objectsToCategoryMap: IObejctsToCategoryMap;
}

export interface IBookmarkCategory {
  name: string;
  objects: IObject[];
}

export type IBookmarksIds = string[];
export type IBookmarkItem = {
  categoryId: string;
  objectsIds: string[];
  categoryName: string;
};
export type IBookmarksData = IBookmarkItem[];

export interface IGetHomeDataResponse {
  data: {listMobileObjects: ICategory[]; getObjectsMetadata: {value: string}};
}

export type SupportedLocales = 'ru' | 'en';

export type CategoryI18n =
  | ({
      __typename: 'CategoryI18n';
      locale: string;
      name?: string | null | undefined;
      singularName?: string | null | undefined;
    } | null)[]
  | null
  | undefined;

export type ObjectI18n =
  | ({
      __typename: 'ObjectI18n';
      locale: string;
      name?: string | null | undefined;
      description?: string | null | undefined;
      governanceType?: string | null | undefined;
      author?: string | null | undefined;
      address?: string | null | undefined;
      notes?: string | null | undefined;
    } | null)[]
  | null
  | undefined;
export type CategoryAndObjectI18n =
  | Array<CategoryI18n | ObjectI18n | null>
  | null
  | undefined;

export enum TestIDs {
  TabBarItemMain = 'tabBarItemMain',
  TabBarItemMap = 'tabBarItemMap',
  TabBarItemFavorites = 'tabBarItemFavorites',
  TabBarItemProfile = 'tabBarItemProfile',
  SearchButton = 'searchButton',
  HeaderScreenTitle = 'headerScreenTitle',
  HeaderBookmarkButton = 'headerBookmarkButton',
  HeaderBackButton = 'headerBackButton',
  HeaderShareButton = 'HeaderShareButton',
  AllButton = 'allButton',
  SeeOnTheMapButton = 'seeOnTheMapButton',
  ObjectDetailsTitle = 'objectDetailsTitle',
  ObjectDetailsAddress = 'objectDetailsAddress',
  ObjectDetailsLocation = 'objectDetailsLocation',
  ObjectDetailsDescription = 'objectDetailsDescription',
  ObjectDetailsReferencesTitle = 'objectDetailsReferencesTitle',
  ObjectDetailsReferencesItem = 'objectDetailsReferencesItem',
  ObjectDetailsOfficialSiteLink = 'objectDetailsOfficialSiteLink',
  ObjectDetailsLinkedTitle = 'objectDetailsLinkedTitle',
  ObjectDetailsLinkedObject = 'objectDetailsLinkedObject',
  ObjectDetailsImage = 'objectDetailsImage',
  HeaderSearchInput = 'headerSearchInput',
  HeaderClearButton = 'headerClearButton',
  SearchResultItem = 'searchResultItem',
  SearchResultItemTitle = 'searchResultItemTitle',
  FavoritesCard = 'favoritesCard',
  MapOverview = 'mapOverview',
  MapSearchBackButton = 'mapSearchBackButton',
  MapItemDetailsSubtitle = 'mapItemDetailsSubtitle',
  MapSearchButton = 'mapSearchButton',
  CategoryTitle = 'categoryTitle',
  CategoryCardTitle = 'categoryCardTitle',
  SubCategoryTitle = 'subCategoryTitle',
  ObjectTitle = 'objectTitle',
  SubObject = 'subObject',
  EmailAuthButton = 'emailAuthButton',
  FacebookAuthButton = 'facebookAuthButton',
  GoogleAuthButton = 'googleAuthButton',
  AppleAuthButton = 'appleAuthButton',
  SendButton = 'sendButton',
  CodeInput = 'codeInput',
  Card = 'card',
}
