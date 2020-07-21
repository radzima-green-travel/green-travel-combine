import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {TestScreen, PlaceDetailsScreen} from 'screens';

import {SCREEN_NAMES} from '../constants';

const Stack = createStackNavigator();

export function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREEN_NAMES.placeDetails}
        component={PlaceDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name={SCREEN_NAMES.test} component={TestScreen} />
    </Stack.Navigator>
  );
}
