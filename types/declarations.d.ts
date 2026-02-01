import '@tanstack/react-query';
import type { NetworkError } from '@core/model';
import type { RootNavigatorParamsList } from '@core/types';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: NetworkError;
  }
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavigatorParamsList {}
  }
}
