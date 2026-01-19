import { createFeature } from '@core/utils';
import { RouteListScreen, RouteScreen } from './containers';
import { useAddToRoute } from './hooks';

export const Routes = createFeature({
  exports: {
    RouteListScreen,
    RouteScreen,
    useAddToRoute,
  },
});

export namespace Routes {
  export type NavigatorParamsList =
    import('./navigation').RoutesNavigatorParamsList;
}
