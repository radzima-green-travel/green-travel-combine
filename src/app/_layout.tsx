import React, {useEffect} from 'react';
import {persistor, store} from 'core/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import {Preview} from 'components/atoms/Preview/Preview';
import {useAnimatedKeyboard} from 'react-native-reanimated';
import {Slot, useNavigationContainerRef, SplashScreen} from 'expo-router';
import {setNavigationRef} from 'services/NavigationService';
import {PortalProvider} from '@gorhom/portal';
import * as ScreenOrientation from 'expo-screen-orientation';
import {useAndroidNavbarStyle} from 'core/hooks/navigation';
import {StatusBar} from 'expo-status-bar';
import '../setup';

SplashScreen.preventAutoHideAsync();
ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

// TODO: [Expo Router] Add Sentry wrapper
export default function RootLayout() {
  useAnimatedKeyboard({
    isStatusBarTranslucentAndroid: true,
  });

  const ref = useNavigationContainerRef();

  useEffect(() => {
    setNavigationRef(ref);
  }, [ref]);

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <Preview>
          <BottomSheetModalProvider>
            <PersistGate loading={null} persistor={persistor}>
              <PortalProvider>
                <Slot />
                <AndroidNavbarStyle />
                <StatusBar
                  animated
                  style="light"
                  backgroundColor="transparent"
                />
              </PortalProvider>
            </PersistGate>
          </BottomSheetModalProvider>
        </Preview>
      </Provider>
    </GestureHandlerRootView>
  );
}

const AndroidNavbarStyle = () => {
  useAndroidNavbarStyle();

  return null;
};
