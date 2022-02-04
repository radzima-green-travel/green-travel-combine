import React from 'react';

import {
  BookmarksListScreen,
  BookmarksScreen,
  ObjectDetailsScreen,
  ObjectsListScreen,
} from 'screens';

import {useTranslation} from 'react-i18next';
import {useScreenOptions} from '../screenOptions';
import {BookmarksNavigatorParamsList} from 'core/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {defaultTransition} from '../transitition';

const Stack = createNativeStackNavigator<BookmarksNavigatorParamsList>();

export function BookmarksNavigator() {
  const screenOptions = useScreenOptions();
  const {t} = useTranslation('common');

  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        title: t('tabs.bookmarks'),
        animation: defaultTransition,
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
