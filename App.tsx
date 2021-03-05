import React from 'react';
import {store, persistor} from 'core/store';
import {RootNavigator} from 'navigation';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
declare let global: {HermesInternal: null | {}};

import {Portal, KeyboardRegulator} from 'atoms';
const App = () => {
  return (
    <Provider store={store}>
      <KeyboardRegulator>
        <Portal.Host>
          <PersistGate loading={null} persistor={persistor}>
            <RootNavigator />
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
          </PersistGate>
        </Portal.Host>
      </KeyboardRegulator>
    </Provider>
  );
};

export default App;
