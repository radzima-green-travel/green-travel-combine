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
}

export interface IExtendedObject extends IObject {}

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

export interface ICategoryWithExtendedObjects extends ICategory {
  objects: IExtendedObject[];
  children: ICategoryWithExtendedObjects[];
}

export interface IBookmarkCategory {
  name: string;
  objects: IObject[];
}

export type IBookmarksIds = string[];
