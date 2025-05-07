import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {PortalProvider} from '@gorhom/portal';
import * as Sentry from '@sentry/react-native';
import {NavbarAndroid} from 'components/atoms/NavbarAndroid';
import {Preview} from 'components/atoms/Preview/Preview';
import {persistor, store} from 'core/store';
import {isRunningInExpoGo} from 'expo';
import {Slot, SplashScreen, useNavigationContainerRef} from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useAnimatedKeyboard} from 'react-native-reanimated';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {setNavigationRef} from 'services/NavigationService';
import {initializeAppDependencies} from '../setup';

SplashScreen.preventAutoHideAsync();
ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: !isRunningInExpoGo(),
});

initializeAppDependencies({
  sentryOptions: {integrations: [navigationIntegration]},
});

function RootLayout() {
  useAnimatedKeyboard({
    isStatusBarTranslucentAndroid: true,
  });

  const ref = useNavigationContainerRef();

  useEffect(() => {
    if (ref) {
      setNavigationRef(ref);
      navigationIntegration.registerNavigationContainer(ref);
    }
  }, [ref]);

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <Preview>
          <BottomSheetModalProvider>
            <PersistGate loading={null} persistor={persistor}>
              <PortalProvider>
                <Slot />
                <NavbarAndroid />
              </PortalProvider>
            </PersistGate>
          </BottomSheetModalProvider>
        </Preview>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default Sentry.wrap(RootLayout);
