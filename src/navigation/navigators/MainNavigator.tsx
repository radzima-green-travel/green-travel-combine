import React, { useCallback, useMemo } from 'react';

import {
  PageNotFoundErrorScreen,
  ObjectDetailsMapScreen,
  ImagesGalleryScreen,
  ObjectDetailsAddInfoScreen,
  ObjectDetailsShareExperienceScreen,
  FiltersScreen,
  SettlementsScreen,
  AddNewPlaceScreen,
} from '../../screens';

import { TabNavigator } from './TabNavigator';
import { MainNavigatorParamsList } from 'core/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { defaultTransition } from '../transition';
import { AuthNavigator } from './AuthNavigator';
import { useTranslation, useColorScheme } from 'core/hooks';
import { useAndroidNavbarStyle, useScreenOptions } from 'navigation/hooks';
import { useSelector } from 'react-redux';
import {
  selectObjectShareExperienceData,
  selectUserAuthorized,
} from 'core/selectors';
import { COLORS } from 'assets';
import { Routes } from '@features/routes';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator<MainNavigatorParamsList>();

export function MainNavigator() {
  useAndroidNavbarStyle();
  const { t: tFiters } = useTranslation('filters');
  const colorScheme = useColorScheme();

  const screenOptions = useScreenOptions({
    animation: defaultTransition,
  });

  const objectShareExperienceData = useSelector(
    selectObjectShareExperienceData,
  );

  const isAuthenticated = useSelector(selectUserAuthorized);

  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigatorParamsList>>();

  const redirectToSignIn = useCallback(
    (params: { onSuccess: () => void; authPromptMessage?: string }) => {
      navigation.navigate('AuthNavigator', {
        screen: 'AuthMethodSelection',
        params: {
          title: params.authPromptMessage,
        },
        onSuccessSignIn: params.onSuccess,
      });
    },
    [navigation],
  );

  const routesDependencies = useMemo(
    () => ({ isAuthenticated, redirectToSignIn }),
    [isAuthenticated, redirectToSignIn],
  );

  return (
    <Routes.Provider value={routesDependencies}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false, animation: 'fade' }}></Stack.Screen>
        <Stack.Screen
          name="ObjectDetailsMap"
          component={ObjectDetailsMapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Group
          screenOptions={() => ({
            headerStyle: {
              backgroundColor:
                colorScheme === 'light'
                  ? COLORS.light.background.primary
                  : COLORS.dark.background.primary,
            },
            presentation: 'modal',
          })}>
          <Stack.Screen
            name="Filter"
            component={FiltersScreen}
            options={{ title: tFiters('title') }}
          />
          <Stack.Screen
            name="Settlements"
            component={SettlementsScreen}
            options={{
              title: tFiters('settlements.title'),
            }}
          />
        </Stack.Group>
        <Stack.Screen
          name="PageNotFoundErrorScreen"
          component={PageNotFoundErrorScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="AuthNavigator"
          component={AuthNavigator}
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="ImagesGallery"
          component={ImagesGalleryScreen}
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name="ObjectDetailsAddInfo"
          component={ObjectDetailsAddInfoScreen}
          options={{
            ...screenOptions,
            headerShown: false,
            presentation: 'modal',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="AddNewPlace"
          component={AddNewPlaceScreen}
          options={{ presentation: 'modal' }}
        />
      </Stack.Navigator>
      {objectShareExperienceData ? (
        <ObjectDetailsShareExperienceScreen />
      ) : null}
    </Routes.Provider>
  );
}
