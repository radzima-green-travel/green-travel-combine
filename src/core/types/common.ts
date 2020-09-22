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

export interface IProhibition {
  _id: string;
  name: string;
  key: string;
}

export interface IObject {
  location: ILocationPoint;
  images: string[];
  prohibitions: IProhibition[];
  _id: string;
  name: string;
  description: string;
  address: string;
  category: string;
  cover: string;
}

export interface ICategory {
  _id: string;
  name: string;
  items: IObject[];
}
