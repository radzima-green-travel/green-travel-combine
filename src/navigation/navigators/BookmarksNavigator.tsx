import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {BookmarksScreen} from 'screens';

import {SCREEN_NAMES} from '../constants';
import {getAppHeaderOptions} from '../screenOptions';
import {useColorScheme} from 'core/hooks';
const Stack = createStackNavigator();

export function BookmarksNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getAppHeaderOptions({colorScheme}),
        title: 'Закладки',
      }}>
      <Stack.Screen name={SCREEN_NAMES.bookmarks} component={BookmarksScreen} />
    </Stack.Navigator>
  );
}
