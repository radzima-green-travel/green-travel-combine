import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {PlaceDetailsScreen} from 'screens';

import {SCREEN_NAMES, NAVIGATORS_NAMES} from '../constants';
import {TabNavigator} from './TabNavigator';

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
      <Stack.Screen
        name={NAVIGATORS_NAMES.tabNavigator}
        component={TabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
