import { ICoordinates } from './common';

export interface IMapFilter {
  categoryId: string;
  title: string;
  icon: string;
}

export type IBounds = [
  ICoordinates,
  ICoordinates,
  [number, number, number, number],
  number,
];
