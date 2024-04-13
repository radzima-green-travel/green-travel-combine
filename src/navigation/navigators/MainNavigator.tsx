import React from 'react';

import {
  PageNotFoundErrorScreen,
  ObjectDetailsMapScreen,
  ImagesGalleryScreen,
  ObjectDetailsAddInfoScreen,
} from '../../screens';

import {TabNavigator} from './TabNavigator';
import {MainNavigatorParamsList} from 'core/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {defaultTransition} from '../transition';
import {AuthNavigator} from './AuthNavigator';
import {useAndroidNavbarStyle, useScreenOptions} from 'navigation/hooks';

const Stack = createNativeStackNavigator<MainNavigatorParamsList>();

export function MainNavigator() {
  useAndroidNavbarStyle();

  const screenOptions = useScreenOptions({
    animation: defaultTransition,
  });

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{headerShown: false, animation: 'fade'}}
      />
      <Stack.Screen
        name="ObjectDetailsMap"
        component={ObjectDetailsMapScreen}
        options={{headerShown: false}}
      />

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
        options={{...screenOptions, headerShown: false, presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
}
