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
  _id: string;
  type: 'Point';
  coordinates: ICoordinates;
}

export interface IArea {
  totalArea: number;
  type: 'MultiPolygon';
  coordinates: ICoordinates[];
}

export interface IProhibition {
  _id: string;
  name: string;
  key: string;
}

export interface IInclude {
  _id: string;
  name: string;
  icon: string;
  objects: string[];
}

export interface IObject {
  _id: string;
  name: string;
  description: string;
  address: string;
  area?: IArea;
  location: ILocationPoint;
  category: string;
  cover: string;
  images: string[];
  prohibitions?: IProhibition[];
  include: IInclude[];
  url?: string;
  origin?: string;
}

export interface IObjectWithIcon extends IObject {
  icon: string;
}

export interface ICategory {
  _id: string;
  path: string;
  name: string;
  icon: string;
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
