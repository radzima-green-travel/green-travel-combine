import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {find, isEmpty, isEqual, mapValues} from 'lodash';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

export function mockCreateGraphQLAPI(
  mock: Record<string, Array<{params: Object; response: Object}>>,
) {
  return mapValues(mock, methodMocks => {
    return jest.fn(
      params =>
        find(methodMocks, mockData => {
          return (
            isEqual(mockData.params, params) ||
            (isEmpty(params) && isEmpty(mockData.params))
          );
        })?.response,
    );
  });
}

export const TestProvider = ({children, store}) => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};
