import '@tanstack/react-query';
import type { NetworkError } from './src/_new/core/model';
import type { RootNavigatorParamsList } from './src/core/types';

declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.png' {
  const value: any;
  export default value;
}

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
