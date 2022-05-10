import {Storage} from 'redux-persist';

export const reduxStorage: Storage =
  require('@react-native-async-storage/async-storage').default;
