import React from 'react';

import {ErrorScreen, ObjectDetailsMapScreen} from 'screens';

import {TabNavigator} from './TabNavigator';
import {MainNavigatorParamsList} from 'core/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {defaultTransition} from '../transitition';

const Stack = createNativeStackNavigator<MainNavigatorParamsList>();

export function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: defaultTransition,
      }}>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{headerShown: false}}
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
    </Stack.Navigator>
  );
}
