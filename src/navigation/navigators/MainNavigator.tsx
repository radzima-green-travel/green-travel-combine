import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {ErrorScreen, ObjectDetailsMapScreen} from 'screens';

import {TabNavigator} from './TabNavigator';
import {MainNavigatorParamsList} from 'core/types';

const Stack = createStackNavigator<MainNavigatorParamsList>();

export function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        detachPreviousScreen: false,
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
        options={ErrorScreen.screenOptions}
      />
    </Stack.Navigator>
  );
}
