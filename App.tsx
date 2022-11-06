import React from 'react';
import {store, persistor} from 'core/store';
import {RootNavigator} from 'navigation';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
declare let global: {HermesInternal: null | {}};
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

// const isHermes = () => !!global.HermesInternal;

// console.log('isHermes', isHermes());

const App = () => {
  return (
    <Provider store={store}>
      <BottomSheetModalProvider>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigator />
          <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        </PersistGate>
      </BottomSheetModalProvider>
    </Provider>
  );
};

export default App;
