import React from 'react';

import {
  BookmarksListScreen,
  BookmarksScreen,
  ObjectDetailsScreen,
  ObjectsListScreen,
} from '../../screens';

import {useTranslation} from 'react-i18next';
import {useScreenOptions} from '../screenOptions';
import {BookmarksNavigatorParamsList} from 'core/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {defaultTransition} from '../transition';

const Stack = createNativeStackNavigator<BookmarksNavigatorParamsList>();

export function BookmarksNavigator() {
  const {t} = useTranslation('common');

  const screenOptions = useScreenOptions({
    title: t('tabs.bookmarks'),
    animation: defaultTransition,
  });

  return (
    <Stack.Navigator screenOptions={screenOptions}>
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
