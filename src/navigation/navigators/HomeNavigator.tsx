import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeScreen,
  ObjectDetailsScreen,
  ObjectsListScreen,
  CategoriesListScreen,
  SearchScreen,
} from '../../screens';
import {useTranslation} from 'core/hooks';
import {HomeNavigatorParamsList} from 'core/types';
import {useScreenOptions} from '../hooks';
import {defaultTransition} from '../transition';

const Stack = createNativeStackNavigator<HomeNavigatorParamsList>();

export function HomeNavigator() {
  const {t: tHome} = useTranslation('home');

  const screenOptions = useScreenOptions({
    title: tHome('headerTitle'),
    animation: defaultTransition,
  });

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{animation: 'fade_from_bottom'}}
      />
      <Stack.Screen
        getId={({params}) => params.objectId}
        name="ObjectDetails"
        initialParams={{
          analytics: {
            fromScreenName: 'DeepLink',
          },
        }}
        component={ObjectDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ObjectsList"
        component={ObjectsListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="CategoriesList" component={CategoriesListScreen} />
    </Stack.Navigator>
  );
}
