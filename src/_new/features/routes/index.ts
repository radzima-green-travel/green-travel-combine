import { createFeature } from '@core/utils';
import { AddToRouteFlow, RouteListScreen, RouteScreen } from './containers';

export const Routes = createFeature({
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
