import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeScreen,
  ObjectDetailsScreen,
  ObjectsListScreen,
  CategoriesListScreen,
  SearchScreen,
} from 'screens';

import {useTranslation} from 'core/hooks';
import {HomeNavigatorParamsList} from 'core/types';
import {useScreenOptions} from '../screenOptions';
import {defaultTransition} from '../transition';

const Stack = createNativeStackNavigator<HomeNavigatorParamsList>();

export function HomeNavigator() {
  const {t} = useTranslation('home');

  const screenOptions = useScreenOptions();
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        title: t('headerTitle'),
        animation: defaultTransition,
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={HomeScreen.screenOptions}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          ...SearchScreen.screenOptions,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="ObjectDetails"
        component={ObjectDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ObjectsList" component={ObjectsListScreen} />
      <Stack.Screen name="CategoriesList" component={CategoriesListScreen} />
    </Stack.Navigator>
  );
}
