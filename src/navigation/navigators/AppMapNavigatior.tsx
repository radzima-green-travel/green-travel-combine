import React from 'react';

import {AppMapScreen, ObjectDetailsScreen, ObjectsListScreen} from 'screens';

import {useScreenOptions} from '../screenOptions';
import {AppMapNavigatorParamsList} from 'core/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {defaultTransition} from '../transition';

const Stack = createNativeStackNavigator<AppMapNavigatorParamsList>();

export function AppMapNavigatior() {
  const screenOptions = useScreenOptions();
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        title: 'Карта',
        animation: defaultTransition,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="AppMap"
        component={AppMapScreen}
      />
      <Stack.Screen
        name="ObjectDetails"
        component={ObjectDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ObjectsList" component={ObjectsListScreen} />
    </Stack.Navigator>
  );
}
