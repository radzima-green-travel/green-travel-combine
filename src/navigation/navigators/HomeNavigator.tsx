import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Animated} from 'react-native';
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
      headerMode="screen"
      screenOptions={{
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
        initialParams={{
          animatedValue: new Animated.Value(0),
        }}
        component={ObjectDetailsScreen}
        options={ObjectDetailsScreen.screenOptions(colorScheme)}
      />
      <Stack.Screen name="ObjectsList" component={ObjectsListScreen} />
      <Stack.Screen name="CategoriesList" component={CategoriesListScreen} />
    </Stack.Navigator>
  );
}
