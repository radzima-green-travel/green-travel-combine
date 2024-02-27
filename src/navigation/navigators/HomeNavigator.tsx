import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeScreen,
  ObjectDetailsScreen,
  ObjectsListScreen,
  CategoriesListScreen,
  SearchScreen,
  ObjectDetailsAddInfoScreen,
} from '../../screens';

import {useTranslation} from 'core/hooks';
import {HomeNavigatorParamsList} from 'core/types';
import {useScreenOptions} from '../hooks';
import {defaultTransition} from '../transition';

const Stack = createNativeStackNavigator<HomeNavigatorParamsList>();

export function HomeNavigator() {
  const {t} = useTranslation('home');

  const screenOptions = useScreenOptions({
    title: t('headerTitle'),
    animation: defaultTransition,
  });

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
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
        getId={({params}) => params.objectId}
        name="ObjectDetails"
        component={ObjectDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ObjectsList" component={ObjectsListScreen} />
      <Stack.Screen name="CategoriesList" component={CategoriesListScreen} />
      <Stack.Screen
        name="ObjectDetailsAddInfo"
        component={ObjectDetailsAddInfoScreen}
        options={{headerShown: false, presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
}
