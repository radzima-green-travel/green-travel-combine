import '@testing-library/react-native';
import { JSX } from 'react';
import 'react-native-gesture-handler/jestSetup';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import {languageService} from 'services/LanguageService';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// include this line for mocking react-native-gesture-handler

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('react-native-theme-switch-animation', () => jest.fn());

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('@gorhom/portal', () => {
  return {
    __esModule: true,
    Portal: ({children}: {children: JSX.Element}) => {
      children;
    },
    usePortal: jest.fn(),
  };
});

jest.mock('redux-persist', () => {
  return {
    persistReducer: jest.fn((_, reducer) => reducer),
    persistStore: jest.fn(a => a),
  };
});

beforeAll(() => {
  languageService.init();
});
