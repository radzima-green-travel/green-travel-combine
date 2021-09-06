import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {
  BookmarksListScreen,
  BookmarksScreen,
  ObjectDetailsScreen,
  ObjectsListScreen,
} from 'screens';

import {getAppHeaderOptions} from '../screenOptions';
import {useColorScheme} from 'core/hooks';
import {BookmarksNavigatorParamsList} from 'core/types';

const Stack = createStackNavigator<BookmarksNavigatorParamsList>();

export function BookmarksNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator
      screenOptions={{
        detachPreviousScreen: false,
        headerMode: 'screen',
        ...getAppHeaderOptions({colorScheme}),

        title: 'Закладки',
      }}>
      <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
      <Stack.Screen
        options={{
          ...getAppHeaderOptions({colorScheme}),
        }}
        name="BookmarksList"
        component={BookmarksListScreen}
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
