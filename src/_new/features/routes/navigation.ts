import type { RouteScreenParams } from './containers';

export type AddObjectsToRouteParams =
  | { name: string; routeId?: never }
  | { routeId: string; name?: never };

export type RoutesNavigatorParamsList = {
  Routes: undefined;
  Route: RouteScreenParams;
  AddObjectsToRoute: AddObjectsToRouteParams;
};
