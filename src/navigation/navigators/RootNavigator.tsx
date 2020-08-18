import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from 'services/NavigationService';
import {MainNavigator} from './MainNavigator';
import {useDispatch} from 'react-redux';
import {bootstrapStart} from 'core/reducers';
export function RootNavigator() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bootstrapStart());
  }, [dispatch]);
  return (
    <NavigationContainer ref={navigationRef}>
      <MainNavigator />
    </NavigationContainer>
  );
}
