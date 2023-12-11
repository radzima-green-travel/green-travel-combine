export interface Visited {
  id: string;
  timestamp: number;
  username?: string;
  rating?: number;
  spentTime?: number;
  sub?: string;
}

export type VisitedObjects = Visited[]

export interface GetVisitedResponse {
  data: VisitedObjects;
}

export interface AddVisitedBody {
  timestamp: number;
  spentTime?: number;
  rating?: number;
}
