import React from 'react';

import {
  BookmarksListScreen,
  BookmarksScreen,
  ObjectDetailsScreen,
  ObjectsListScreen,
} from 'screens';

import {useScreenOptions} from '../screenOptions';
import {BookmarksNavigatorParamsList} from 'core/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<BookmarksNavigatorParamsList>();

export function BookmarksNavigator() {
  const screenOptions = useScreenOptions();
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        title: 'Закладки',
      }}>
      <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
      <Stack.Screen name="BookmarksList" component={BookmarksListScreen} />
      <Stack.Screen
        name="ObjectDetails"
        component={ObjectDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ObjectsList" component={ObjectsListScreen} />
    </Stack.Navigator>
  );
}
