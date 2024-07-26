import {ObjectField} from 'core/constants';

export interface VisitedObject {
  id: string;
  timestamp: number;
  username?: string;
  rating?: number;
  spentTime?: number;
  sub?: string;
}

export type VisitedObjectsData = VisitedObject[];

export interface GetVisitedObjectsResponse {
  data: VisitedObjectsData;
}

export interface AddVisitedObjectBody {
  timestamp: number;
  spentTime?: number | null;
  rating?: number | null;
}

export type ShareExperienceInitialData = {
  objectId: string;
  objectName: string;
  incompleteFieldsNames: ObjectField[];
  analyticsMetadata: {
    name: string;
    categoryName: string;
  };
};
