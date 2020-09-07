import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {RouteDetailsFullScreen} from 'screens';

import {TabNavigator} from './TabNavigator';
import {MainNavigatorParamsList} from 'core/types';

const Stack = createStackNavigator<MainNavigatorParamsList>();

export function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PlaceDetails"
        component={RouteDetailsFullScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
