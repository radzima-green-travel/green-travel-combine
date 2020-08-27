export interface ILabelError {
  message: {
    titlePaths: string[];
    textPaths: string[];
  };
  status?: number;
  originalMessage: string;
}

export type ICoordinates = Array<string>;

export interface ILocationPoint {
  type: 'Point';
  coordinates: ICoordinates;
}

export interface IObject {
  location: ILocationPoint;
  images: string[];
  prohibitions: string[];
  _id: string;
  name: string;
  description: string;
  address: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  cover: string;
}

export interface ICategory {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
