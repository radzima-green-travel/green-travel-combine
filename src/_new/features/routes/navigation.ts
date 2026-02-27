import type { RouteScreenParams } from './containers';

export type AddObjectsToRouteParams =
  | {
      name: string;
      routeId?: never;
      onDone?: (addedIds: string[]) => void;
    }
  | {
      routeId: string;
      name?: never;
      onDone?: (addedIds: string[]) => void;
    };

export type RoutesNavigatorParamsList = {
  Routes: undefined;
  Route: RouteScreenParams;
  AddObjectsToRoute: AddObjectsToRouteParams;
};
