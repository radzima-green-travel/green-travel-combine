import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from 'services/NavigationService';
import {MainNavigator} from './MainNavigator';

export function RootNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainNavigator />
    </NavigationContainer>
  );
}
