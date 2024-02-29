import React from 'react';
import {store, persistor} from 'core/store';
import {RootNavigator} from 'navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import './index.ts';
import 'react-native-gesture-handler';
import * as expoConfig from './app.json';

import * as Sentry from '@sentry/react-native';


// import {ComponentSandbox} from 'atoms';
// TODO: fix analytics details page, fix input color, fix snacbars position and color

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        {/* <ComponentSandbox> */}
        <BottomSheetModalProvider>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaProvider>
              <RootNavigator />
            </SafeAreaProvider>
          </PersistGate>
        </BottomSheetModalProvider>
        {/* </ComponentSandbox> */}
      </Provider>
    </GestureHandlerRootView>
  );
};

const AppWithSentry = Sentry.wrap(App);
AppRegistry.registerComponent(expoConfig.expo.name, () => AppWithSentry);

export default App;
