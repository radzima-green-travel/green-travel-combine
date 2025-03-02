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
import {useNewScreenOptions, useScreenOptions} from '../hooks';
import {defaultTransition} from '../transition';
import {merge} from 'lodash';

const Stack = createNativeStackNavigator<HomeNavigatorParamsList>();

export function HomeNavigator() {
  const {t: tHome} = useTranslation('home');

  const newScreenOptions = useNewScreenOptions({
    title: tHome('headerTitle'),
    animation: defaultTransition,
  });

  const screenOptions = useScreenOptions({
    title: tHome('headerTitle'),
    animation: defaultTransition,
  });

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={newScreenOptions}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={props => {
          const commonScreenOptions = newScreenOptions(props);
          const searchSpecificScreenOptions = SearchScreen.screenOptions(props);
          return {
            ...commonScreenOptions,
            ...searchSpecificScreenOptions,
            headerStyle: merge(
              commonScreenOptions.headerStyle,
              searchSpecificScreenOptions.headerStyle,
            ),
            animation: 'fade_from_bottom',
          };
        }}
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
      <Stack.Screen name="ObjectsList" component={ObjectsListScreen} />
      <Stack.Screen name="CategoriesList" component={CategoriesListScreen} />
    </Stack.Navigator>
  );
}
