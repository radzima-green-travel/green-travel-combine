import React, {useEffect, useState, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from 'services/NavigationService';
import * as SplashScreen from 'expo-splash-screen';
import {MainNavigator} from './MainNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {bootstrapRequest} from 'core/actions';
import {StatusBar} from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import {
  ForceUpdateScreen,
  OptionalUpdateScreen,
  SplashScreen as CustomSplashScreen,
} from '../../screens';

import {PortalProvider} from '@gorhom/portal';
import {useOnRequestSuccess, useRequestError} from 'react-redux-help-kit';
import {MainNavigatorParamsList} from 'core/types';
import {
  selectUpdatesAvailable,
  selectUpdatesMandatory,
  selectUpdatesSkipped,
} from 'core/selectors';
import {linkingService} from 'services/LinkingService';
import {useColorScheme} from 'core/hooks';

SplashScreen.preventAutoHideAsync();
ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

export function RootNavigator() {
  const dispatch = useDispatch();
  const theme = useColorScheme();
  const isUpdatesMandatory = useSelector(selectUpdatesMandatory);
  const isUpdatesAvailable = useSelector(selectUpdatesAvailable);
  const isUpdatesSkipped = useSelector(selectUpdatesSkipped);

  const [splashTransitionFinished, setSplashTransitionFinished] =
    useState(false);
  const [bootstrapFinished, setBootstrapFinished] = useState(false);

  const [isReady, setIsReady] = useState(false);
  const [splashFadingStarted, setSplashFadingStarted] = useState(false);

  const statusBarThemedStyle = theme === 'dark' ? 'light' : 'dark';
  const statusBarStyle = splashFadingStarted ? 'light' : statusBarThemedStyle;

  useEffect(() => {
    dispatch(bootstrapRequest());
  }, [dispatch]);

  const onAnimationEnd = useCallback(() => {
    setSplashTransitionFinished(true);
  }, []);

  const finishBootstrap = useCallback(() => {
    setBootstrapFinished(true);
  }, []);

  useOnRequestSuccess(bootstrapRequest, finishBootstrap);

  const {error, clearError} = useRequestError(bootstrapRequest);
  useEffect(() => {
    if (error) {
      clearError();
      finishBootstrap();
    }
  }, [clearError, error, finishBootstrap]);

  const onFadeStart = useCallback(() => {
    setSplashFadingStarted(true);
  }, []);

  const showSplash = () => {
    if (isReady) {
      return splashTransitionFinished ? null : (
        <CustomSplashScreen
          onFadeStart={onFadeStart}
          onAnimationEnd={onAnimationEnd}
        />
      );
    }

    return null;
  };

  const showUpdateScreen = () => {
    if (!splashTransitionFinished) {
      return null;
    } else if (isUpdatesMandatory) {
      return <ForceUpdateScreen />;
    } else if (isUpdatesAvailable && !isUpdatesSkipped) {
      return <OptionalUpdateScreen />;
    }

    return null;
  };

  return (
    <NavigationContainer<MainNavigatorParamsList>
      linking={linkingService.getInitialLinkingData()}
      onReady={() => setIsReady(true)}
      ref={navigationRef}>
      <PortalProvider>
        {bootstrapFinished ? (
          <>
            <MainNavigator />
            {showUpdateScreen()}
            {showSplash()}
          </>
        ) : null}
      </PortalProvider>
      <StatusBar
        animated
        style={statusBarStyle}
        backgroundColor="transparent"
      />
    </NavigationContainer>
  );
}
