import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from 'services/NavigationService';
import {MainNavigator} from './MainNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {bootstrapStart} from 'core/reducers';
import SplashScreen from 'react-native-splash-screen';
import {IState} from 'core/store';
const SplasScreen = () => {
  useEffect(() => {
    return () => {
      SplashScreen.hide();
    };
  }, []);
  return null;
};

export function RootNavigator() {
  const dispatch = useDispatch();
  const bootstrapFinished = useSelector(
    (state: IState) => state.bootsrap.finished,
  );

  useEffect(() => {
    dispatch(bootstrapStart());
  }, [dispatch]);
  return (
    <NavigationContainer ref={navigationRef}>
      {bootstrapFinished ? <MainNavigator /> : <SplasScreen />}
    </NavigationContainer>
  );
}
