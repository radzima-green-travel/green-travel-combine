import {MultiPolygon, LineString} from '@turf/helpers';
export interface ILabelError {
  message: {
    titlePaths: string[];
    textPaths: string[];
  };
  status?: number;
  originalMessage: string;
}

export type ICoordinates = Array<number>;

export interface ILocationPoint {
  lat: number;
  lon: number;
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

export interface IObject {
  id: string;
  name: string;
  description: string;
  address: string;
  area?: MultiPolygon;
  location: ILocationPoint;
  category: IObjectCategory;
  cover: string;
  images: string[];
  prohibitions?: IProhibition[];
  include: IInclude[];
  belongsTo: IBelongsTo[];
  url?: string;
  origin?: string;
  routes?: LineString;
  length: number | null;
}

export interface ICategory {
  id: string;
  path: string;
  name: string;
  icon: string;
  cover: string | null;
  parent?: string;
  updatedAt: string;
  fields: string[];
  objects: IObject[];
  children: ICategory[];
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
