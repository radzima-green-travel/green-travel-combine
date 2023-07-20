import React, {useEffect, useState, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from 'services/NavigationService';
import {MainNavigator} from './MainNavigator';
import {useDispatch} from 'react-redux';
import {bootstrapRequest} from 'core/reducers';
import {StatusBar} from 'react-native';
import config from 'react-native-ultimate-config';
import {SplashScreen} from '../../screens';

import {PortalProvider} from '@gorhom/portal';
import {useOnRequestSuccess, useRequestError} from 'react-redux-help-kit';
import {MainNavigatorParamsList} from 'core/types';

export function RootNavigator() {
  const dispatch = useDispatch();
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

  return (
    <NavigationContainer<MainNavigatorParamsList>
      linking={{
        prefixes: [`https://${config.DEEP_LINK_DOMAIN}`],
        config: {
          initialRouteName: 'TabNavigator',
          screens: {
            PageNotFoundErrorScreen: '*',
            TabNavigator: {
              screens: {
                HomeNavigator: {
                  initialRouteName: 'Home' as unknown as undefined,
                  screens: {
                    ObjectDetails: 'object/:objectId',
                  },
                },
              },
            },
          },
        },
      }}
      onReady={() => setIsReady(true)}
      ref={navigationRef}>
      <PortalProvider>
        {bootstrapFinished ? (
          <>
            <MainNavigator />
            {showSplashForAndroid()}
          </>
        ) : null}
      </PortalProvider>
    </NavigationContainer>
  );
}
