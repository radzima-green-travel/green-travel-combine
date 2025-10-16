import type {MultiPolygon, LineString} from 'geojson';
import {IRequestError} from './errors';
import {animations} from 'assets';
import {ObjectField} from 'core/constants';
import {
  CategoryFilterItemDTO,
  CategoryShortDTO,
  ExtractI18nKeys,
  LocationDTO,
  ObjectCategoryMapDTO,
  ObjectMapDTO,
  ObjectShortDTO,
  PlaceOfTheWeekObjectDTO,
  SearchObjectDTO,
  SearchObjetcCategoryDTO,
  SpotItemDTO,
} from './api';
import {TextInputProps} from 'react-native';

export type TranslatedEntity<T> = Omit<T, 'i18n'> & {
  analyticsMetadata: Record<ExtractI18nKeys<T>, string>;
};
export interface ILabelError {
  text: string;
  title: string;
  originalError: IRequestError | Error;
}

export type ICoordinates = number[];

export interface IArea {
  totalArea: number;
  type: 'MultiPolygon';
  coordinates: ICoordinates[];
}

export interface IInclude {
  categoryId: string;
  name: string;
  image: string;
  objects: {id: string; cover: string; blurhash: string | null}[];
  analyticsMetadata: {
    name: string;
  };
}
export interface IBelongsTo {
  objectId: string;
  name: string;
  categoryName: string;
  blurhash: string | null;
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
  location: LocationDTO | null;
  category: IObjectCategory;
  images: string[];
  include: IInclude[];
  belongsTo: IBelongsTo[];
  url: string | null;
  origin?: string;
  origins?: IOrigins[];
  routes: LineString | null;
  length: number | null;
  phoneNumbers: string[] | null;
  workingHours: string | null;
  attendanceTime: number | null;
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
  | (CategoryI18n | ObjectI18n | null)[]
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

export type CategoryShort = TranslatedEntity<CategoryShortDTO>;
export type ObjectShort = TranslatedEntity<ObjectShortDTO>;
export type ObjectCategoryMap = TranslatedEntity<ObjectCategoryMapDTO>;
export type SearchObjectCategory = TranslatedEntity<SearchObjetcCategoryDTO>;
export type SpotItem = TranslatedEntity<SpotItemDTO>;
export type CategoryFilterItem = TranslatedEntity<CategoryFilterItemDTO>;
export interface PlaceOfTheWeekObject
  extends Omit<TranslatedEntity<PlaceOfTheWeekObjectDTO>, 'category'> {
  category: TranslatedEntity<PlaceOfTheWeekObjectDTO['category']>;
}

export interface ObjectMap extends ObjectMapDTO {}

export interface TranslatedSearchObject
  extends Omit<
    TranslatedEntity<SearchObjectDTO>,
    'category' | 'calculatedProperties'
  > {
  category: SearchObjectCategory;
}

export interface SearchObject
  extends Omit<TranslatedSearchObject, 'addresses'> {
  highlight?: {
    name: string;
    description?: string;
    address?: string;
  };
  usersRating?: number | null;
}
export interface CardItem {
  name: string;
  cover: string;
  blurhash: string | null;
  id: string;
  analyticsMetadata: {
    categoryName: string;
    objectName?: string;
  };
  categoryName?: string;
  usersRating?: number | null;
  usersRatingsTotal?: number | null;
  googleRating?: number | null;
  googleRatingsTotal?: number | null;
}

export type FormFieldConfig = Pick<
  TextInputProps,
  'maxLength' | 'multiline' | 'keyboardType'
>;
