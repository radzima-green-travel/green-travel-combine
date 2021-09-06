import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  ObjectDetailsScreen,
  ObjectsListScreen,
  CategoriesListScreen,
  SearchScreen,
} from 'screens';

import {useColorScheme, useTranslation} from 'core/hooks';
import {HomeNavigatorParamsList} from 'core/types';
import {getAppHeaderOptions} from '../screenOptions';

const Stack = createStackNavigator<HomeNavigatorParamsList>();

export function HomeNavigator() {
  const colorScheme = useColorScheme();
  const {t} = useTranslation('home');
  return (
    <Stack.Navigator
      screenOptions={{
        detachPreviousScreen: false,
        headerMode: 'screen',
        ...getAppHeaderOptions({colorScheme}),
        title: t('headerTitle'),
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={HomeScreen.screenOptions}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={SearchScreen.screenOptions}
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
