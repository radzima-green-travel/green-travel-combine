import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {ObjectsListScreen, RouteDetailsFullScreen} from 'screens';

import {TabNavigator} from './TabNavigator';
import {MainNavigatorParamsList} from 'core/types';
import {getAppHeaderOptions} from '../screenOptions';
import {useColorScheme} from 'core/hooks';

const Stack = createStackNavigator<MainNavigatorParamsList>();

export function MainNavigator() {
  const colorScheme = useColorScheme();

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
      <Stack.Screen
        options={{
          ...getAppHeaderOptions({colorScheme}),
        }}
        name="ObjectsList"
        component={ObjectsListScreen}
      />
    </Stack.Navigator>
  );
}
