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
}

export interface IChildren {
  _id: string;
  path: string;
  parent: string;
  name: string;
  icon: string;
  fields: string[];
  children: IChildren[];
  cover: string;
}

export interface IExtendedObject extends IObject {
  isFavorite: boolean;
}

export interface ICategory {
  _id: string;
  name: string;
  icon: string;
  updatedAt: string;
  fields: string[];
  objects: IObject[];
  children: IChildren[];
}

export interface ICategoryWithExtendedObjects extends ICategory {
  objects: IExtendedObject[];
}

export type IBookmarksIds = string[];
