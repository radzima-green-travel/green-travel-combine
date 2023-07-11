import React from 'react';

import {ErrorScreen, ObjectDetailsMapScreen} from '../../screens';

import {TabNavigator} from './TabNavigator';
import {MainNavigatorParamsList} from 'core/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {defaultTransition} from '../transition';
import {AuthNavigator} from './AuthNavigator';
import {useAndroidNavbarStyle} from 'navigation/hooks';

const Stack = createNativeStackNavigator<MainNavigatorParamsList>();

export function MainNavigator() {
  useAndroidNavbarStyle();

  return (
    <Stack.Navigator
      screenOptions={{
        animation: defaultTransition,
      }}>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{headerShown: false, animation: 'fade'}}
      />
      <Stack.Screen
        name="ObjectDetailsMap"
        component={ObjectDetailsMapScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ErrorScreen"
        component={ErrorScreen}
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="AuthNavigator"
        component={AuthNavigator}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
}
