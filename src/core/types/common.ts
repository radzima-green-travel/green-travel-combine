import {MultiPolygon, LineString} from '@turf/helpers';
import {IRequestError} from './errors';
import {animations} from 'assets';
import {ObjectField} from 'core/constants';
import {
  CategoryShortDTO,
  ExtractI18nKeys,
  MapSpotDTO,
  ObjectCategoryMapDTO,
  ObjectMapDTO,
  ObjectShortDTO,
} from './api';

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

export interface IInclude {
  categoryId: string;
  name: string;
  image: string;
  objects: string[];
  analyticsMetadata: {
    name: string;
  };
}
export interface IBelongsTo {
  objectId: string;
  name: string;
  categoryName: string;
  image: string;
  analyticsMetadata: {
    name: string;
    categoryName: string;
  };
}

export interface IObjectCategory {
  icon: string;
  id: string;
  name: string;
  parent: string | null;
  singularName: string;
  incompleteFieldsNames: ObjectField[];
  percentageOfCompletion: number;
}

export interface IOrigins {
  name: string;
  value: string;
}

export interface IObjectAdditionalInfoItem {
  name: string;
  date?: string;
  link?: string;
  googleLink?: string;
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
  include: IInclude[];
  belongsTo: IBelongsTo[];
  url?: string;
  origin?: string;
  origins?: IOrigins[];
  routes?: LineString;
  length: number | null;
  blurhash?: string;
  phoneNumbers?: string[] | null;
  workingHours?: string | null;
  attendanceTime?: number | null;
  renting: string[];
  childServices: string[];
  usersRating: number | null;
  googleRating: number | null;
  usersRatingsTotal: number | null;
  googleRatingsTotal: number | null;
  upcomingEvents: IObjectAdditionalInfoItem[];
  accommodationPlace: IObjectAdditionalInfoItem[];
  dinnerPlaces: IObjectAdditionalInfoItem[];
  analyticsMetadata: {
    name: string;
    categoryName: string;
  };
}

export interface ISpot {
  id: string;
  value: string;
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
  completenessFields: string[];
  analyticsMetadata: {
    name: string;
  };
}

export interface ITransformedCategory
  extends Omit<ICategory, 'objects' | 'children'> {
  objects: string[];
  children: string[];
}

export interface ICategoriesMap {
  [key: string]: ITransformedCategory;
}

export interface IObjectsMap {
  [key: string]: IObject;
}
export interface IObjectsToCategoryMap {
  [key: string]: string;
}

export interface ISpotsMap {
  [key: string]: ISpot;
}

export interface IObjectIncompleteField {
  id: ObjectField;
  label: string;
}

export interface ITransformedData {
  categories: ITransformedCategory[];
  objectsMap: IObjectsMap;
  categoriesMap: ICategoriesMap;
  objectsToCategoryMap: IObjectsToCategoryMap;
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

export type AnimationName = keyof typeof animations;

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

export type SpotI18n =
  | ({
      __typename: 'SpotI18n';
      locale: string;
      value?: string | null | undefined;
    } | null)[]
  | null
  | undefined;

export interface CategoryShort extends CategoryShortDTO {
  analyticsMetadata: Record<ExtractI18nKeys<ObjectShortDTO>, string>;
}

export interface ObjectShort extends ObjectShortDTO {
  analyticsMetadata: Record<ExtractI18nKeys<ObjectShortDTO>, string>;
}

export interface ObjectMap extends ObjectMapDTO {
  analyticsMetadata: Record<ExtractI18nKeys<ObjectMapDTO>, string>;
  address: string;
}

export interface MapSpot extends MapSpotDTO {
  analyticsMetadata: Record<ExtractI18nKeys<MapSpotDTO>, string>;
}

export interface ObjectCategoryMap extends ObjectCategoryMapDTO {
  analyticsMetadata: Record<ExtractI18nKeys<ObjectCategoryMapDTO>, string>;
}
export interface CardItem {
  name: string;
  cover: string;
  blurhash: string;
  id: string;
  analyticsMetadata: {
    categoryName: string;
    objectName?: string;
  };
}

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
  FavoriteButton = 'favoriteButton',
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
  SubmitButton = 'submitButton',
  SecondaryButton = 'secondaryButton',
  CodeInput = 'codeInput',
  EmailInput = 'emailInput',
  PasswordInput = 'passwordInput',
  OldPasswordInput = 'oldPasswordInput',
  NewPasswordInput = 'newPasswordInput',
  Icon = 'icon',
  Card = 'card',
  AppUpdateBottomMenu = 'appUpdateBottomMenu',
  AppMapSearchBottomMenu = 'appMapSearchBottomMenu',
  AppMapObjectBottomMenu = 'appMapObjectBottomMenu',
  ObjectShareExperienceMenu = 'objectShareExperienceMenu',
  ObjectShareExperienceMenuContent = 'objectShareExperienceMenuContent',
  ObjectReportinaccuraciesMenu = 'objectReportinaccuraciesMenu',
  ObjectReportinaccuraciesMenuContent = 'objectReportinaccuraciesMenuContent',
  ObjectShareExperienceSuccessMenu = 'objectShareExperienceSuccessMenu',
  ObjectShareExperienceSuccessMenuContent = 'objectShareExperienceSuccessMenuContent',
  MarkAsVisitedButton = 'markAsVisitedButton',
  ObjectDetailsBottomButtons = 'objectDetailsBottomButtons',
  ObjectDetailsReportInaccuraciesButton = 'objectDetailsReportInaccuraciesButton',
  ObjectDetailsCompletenessBlock = 'objectDetailsCompletenessBlock',
  objectDetailsCompletenessBlockSmall = 'objectDetailsCompletenessBlockSmall',
  ObjectDetailsAddInfoList = 'objectDetailsAddInfoList',
  ObjectDetailsAddInfoSubmitButton = 'objectDetailsAddInfoSubmitButton',
  ObjectDetailsAddInfoMenu = 'objectDetailsAddInfoMenu',
  ObjectDetailsAddInfoMenuContent = 'objectDetailsAddInfoMenuContent',
  ObjectDetailsAddInfoSuccessMenu = 'objectDetailsAddInfoSuccessMenu',
  ObjectDetailsPhoneNumbersMenu = 'objectDetailsPhoneNumbersMenu',
  ObjectDetailsAddInfoSuccessMenuContent = 'objectDetailsAddInfoSuccessMenuContent',
  ObjectDetailsOfficialWebsite = 'objectDetailsOfficialWebsite',
  ObjectDetailsPhoneNumber = 'objectDetailsPhoneNumber',
  ObjectDetailsAttendanceTime = 'objectDetailsAttendanceTime',
  ObjectDetailsWorkingHours = 'objectDetailsWorkingHours',
  ObjectDetailsRenting = 'objectDetailsRenting',
  ObjectDetailsChildService = 'objectDetailsChildService',
  ObjectDetailsAccommodationPlace = 'objectDetailsAccommodationPlace',
  ObjectDetailsUpcomingEvents = 'objectDetailsUpcomingEvents',
  ObjectDetailsDinnerPlaces = 'objectDetailsDinnerPlaces',
  ObjectDetailsIncludes = 'objectDetailsIncludes',
  ObjectDetailsBelongsTo = 'objectDetailsBelongsTo',
  ObjectDetailsAddInfoConfirmMenu = 'objectDetailsAddInfoConfirmMenu',
  ObjectDetailsAddInfoConfirmContent = 'objectDetailsAddInfoConfirmContent',
}
