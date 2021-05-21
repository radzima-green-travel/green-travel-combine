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
import {Animated} from 'react-native';

const Stack = createStackNavigator<BookmarksNavigatorParamsList>();

export function BookmarksNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
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
        initialParams={{
          animatedValue: new Animated.Value(0),
        }}
        component={ObjectDetailsScreen}
        options={ObjectDetailsScreen.screenOptions(colorScheme)}
      />
      <Stack.Screen name="ObjectsList" component={ObjectsListScreen} />
    </Stack.Navigator>
  );
}
