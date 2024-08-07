import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeScreen,
  ObjectDetailsScreen,
  ObjectsListScreen,
  CategoriesListScreen,
  SearchScreen,
  FiltersScreen,
  SettlementsScreen,
} from '../../screens';

import {useTranslation, useColorScheme} from 'core/hooks';
import {HomeNavigatorParamsList} from 'core/types';
import {useScreenOptions} from '../hooks';
import {defaultTransition} from '../transition';
import {COLORS} from 'assets';

const Stack = createNativeStackNavigator<HomeNavigatorParamsList>();

export function HomeNavigator() {
  const {t: tHome} = useTranslation('home');
  const {t: tFiters} = useTranslation('filters');
  const colorScheme = useColorScheme();
  const screenModalOptions = useScreenOptions({
    headerStyle: {
      backgroundColor:
        colorScheme === 'light'
          ? COLORS.light.background.primary
          : COLORS.dark.background.primary,
    },
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
        options={HomeScreen.screenOptions}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={props => ({
          ...SearchScreen.screenOptions(props),
          animation: 'fade',
        })}
      />
      <Stack.Group
        screenOptions={props => ({
          ...screenModalOptions(props),
          presentation: 'modal',
        })}>
        <Stack.Screen
          name="Filter"
          component={FiltersScreen}
          options={props => ({
            ...FiltersScreen.screenOptions(props),
          })}
        />
        <Stack.Screen
          name="Settlements"
          component={SettlementsScreen}
          options={props => ({
            ...SettlementsScreen.screenOptions(props),
            title: tFiters('settlements.title'),
            headerTintColor:
              colorScheme === 'light'
                ? COLORS.light.text.primary
                : COLORS.dark.text.primary,
          })}
        />
      </Stack.Group>
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
