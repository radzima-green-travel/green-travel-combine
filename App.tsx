import React from 'react';
import {store, persistor} from 'core/store';
import {RootNavigator} from 'navigation';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
declare let global: {HermesInternal: null | {}};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
        <StatusBar backgroundColor="transparent" translucent />
      </PersistGate>
    </Provider>
  );
};

export default App;
