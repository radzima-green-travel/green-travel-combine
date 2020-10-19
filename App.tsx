import React from 'react';
import {store} from 'core/store';
import {RootNavigator} from 'navigation';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
declare let global: {HermesInternal: null | {}};

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
      <StatusBar backgroundColor="transparent" translucent />
    </Provider>
  );
};

export default App;
