import React from 'react';
import {store, persistor} from 'core/store';
import {RootNavigator} from 'navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// TODO: fix analytics details page, fix input color, fix snacbars position and color

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <BottomSheetModalProvider>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaProvider>
              <RootNavigator />
            </SafeAreaProvider>
          </PersistGate>
        </BottomSheetModalProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
