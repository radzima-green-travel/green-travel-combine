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
  spentTime?: number;
  rating?: number;
}

export interface AddVisitedObjectRequestBody {
  objectId: string;
  data: AddVisitedObjectBody;
}
