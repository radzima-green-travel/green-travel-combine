import {useTranslation} from 'core/hooks';
import {Stack} from 'expo-router';
import {merge} from 'lodash';
import {useNewScreenOptions, useScreenOptions} from 'navigation/hooks';
import {defaultTransition} from 'navigation/transition';
import React from 'react';
import {SearchScreen} from 'screens';

export default function TabStackLayout({segment}) {
  const stackSettings = {
    '(home)': {
      initialRouteName: 'index',
      tabName: 'home',
    },
    '(map)': {
      initialRouteName: 'map',
      tabName: 'map',
    },
    '(bookmarks)': {
      initialRouteName: 'bookmarks',
      tabName: 'bookmarks',
    },
    '(profile)': {
      initialRouteName: 'profile',
      tabName: 'profile',
    },
  }[segment];

  const {t} = useTranslation('common');

  const screenOptions = useScreenOptions({
    title: t(`tabs.${stackSettings.tabName}`),
    animation: defaultTransition,
  });

  const newScreenOptions = useNewScreenOptions({
    title: t('headerTitle'),
    animation: defaultTransition,
  });

  return (
    <Stack
      screenOptions={screenOptions}
      initialRouteName={stackSettings.initialRouteName}>
      <Stack.Screen name="index" options={newScreenOptions} />
      <Stack.Screen
        name="search"
        options={props => {
          const commonScreenOptions = newScreenOptions(props);
          const searchSpecificScreenOptions = SearchScreen.screenOptions;

          return {
            ...commonScreenOptions,
            ...searchSpecificScreenOptions,
            headerStyle: merge(
              commonScreenOptions.headerStyle,
              searchSpecificScreenOptions.headerStyle,
            ),
            animation: 'fade',
          };
        }}
      />
      <Stack.Screen
        name="object/[objectId]"
        getId={({params}) => params?.objectId}
        initialParams={{fromScreenName: 'DeepLink'}}
        options={{headerShown: false}}
      />
      <Stack.Screen name="map" options={{headerShown: false}} />
    </Stack>
  );
}
