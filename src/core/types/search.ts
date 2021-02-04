import {IExtendedObject} from './common';

export interface IExtendedObjectWithCategoryData extends IExtendedObject {
  categoryName: string;
  icon: string;
}
