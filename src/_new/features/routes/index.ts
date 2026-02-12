import { createFeature } from '@core/utils';
import { AddToRouteFlow, RouteListScreen, RouteScreen } from './containers';
import { RoutesDependencies } from './context';

export const Routes = createFeature({
  dependencies: RoutesDependencies,
  exports: {
    RouteListScreen,
    RouteScreen,
    AddToRouteFlow,
  },
});

export namespace Routes {
  export type NavigatorParamsList =
    import('./navigation').RoutesNavigatorParamsList;
}
