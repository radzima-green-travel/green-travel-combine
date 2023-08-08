import React, {useEffect, useState, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from 'services/NavigationService';
import {MainNavigator} from './MainNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {bootstrapRequest} from 'core/reducers';
import {StatusBar} from 'react-native';
import {
  ForceUpdateScreen,
  OptionalUpdateScreen,
  SplashScreen,
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

export function RootNavigator() {
  const dispatch = useDispatch();
  const isUpdatesMandatory = useSelector(selectUpdatesMandatory);
  const isUpdatesAvailable = useSelector(selectUpdatesAvailable);
  const isUpdatesSkipped = useSelector(selectUpdatesSkipped);
  const [splashTransitionFinished, setSplashTransitionFinished] =
    useState(false);
  const [bootstrapFinished, setBootstrapFinished] = useState(false);

  const [isReady, setIsReady] = useState(false);

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
    StatusBar.pushStackEntry({
      barStyle: 'light-content',
      animated: true,
    });
  }, []);

  const showSplashForAndroid = () => {
    if (isReady) {
      return splashTransitionFinished ? null : (
        <SplashScreen
          onFadeStart={onFadeStart}
          onAnimationEnd={onAnimationEnd}
        />
      );
    }

    return null;
  };

  const showUpdateScreen = () => {
    if (isUpdatesMandatory) {
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
            {showSplashForAndroid()}
          </>
        ) : null}
      </PortalProvider>
    </NavigationContainer>
  );
}
