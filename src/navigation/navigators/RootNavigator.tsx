import React, {useEffect, useState, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from 'services/NavigationService';
import {MainNavigator} from './MainNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {bootstrapStart} from 'core/reducers';
import {IState} from 'core/store';
import {StatusBar} from 'react-native';

import {SplashScreen} from 'screens';
import {isIOS} from 'services/PlatformService';

export function RootNavigator() {
  const dispatch = useDispatch();
  const [splashTransitionFinished, setSplashTransitionFinished] =
    useState(false);
  const bootstrapFinished = useSelector(
    (state: IState) => state.bootsrap.finished,
  );

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(bootstrapStart());
  }, [dispatch]);

  const onAnimationEnd = useCallback(() => {
    setSplashTransitionFinished(true);
  }, []);

  const onFadeStart = useCallback(() => {
    StatusBar.pushStackEntry({
      barStyle: 'light-content',
      animated: true,
    });
  }, []);

  const showSplashForAndroid = () => {
    if (!isIOS && isReady) {
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
    <NavigationContainer onReady={() => setIsReady(true)} ref={navigationRef}>
      {bootstrapFinished && <MainNavigator />}
      {showSplashForAndroid()}
    </NavigationContainer>
  );
}
