import React from 'react';
import {store, persistor} from 'core/store';
import {RootNavigator} from 'navigation';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <Provider store={store}>
      <BottomSheetModalProvider>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <RootNavigator />
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
          </SafeAreaProvider>
        </PersistGate>
      </BottomSheetModalProvider>
    </Provider>
  );
};

export default App;
