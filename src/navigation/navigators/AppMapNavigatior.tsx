import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {AppMapScreen} from 'screens';

import {SCREEN_NAMES} from '../constants';
import {getAppHeaderOptions} from '../screenOptions';
import {useColorScheme} from 'core/hooks';
const Stack = createStackNavigator();

export function AppMapNavigatior() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getAppHeaderOptions({colorScheme}),
        title: 'Карта',
      }}>
      <Stack.Screen name={SCREEN_NAMES.appMap} component={AppMapScreen} />
    </Stack.Navigator>
  );
}
