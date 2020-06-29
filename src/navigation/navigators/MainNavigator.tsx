import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {TestScreen} from 'screens';

import {SCREEN_NAMES} from '../constants';

const Stack = createStackNavigator();

export function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SCREEN_NAMES.test} component={TestScreen} />
    </Stack.Navigator>
  );
}
