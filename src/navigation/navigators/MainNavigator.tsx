import React from 'react';

import {
  PageNotFoundErrorScreen,
  ObjectDetailsMapScreen,
  ImagesGalleryScreen,
  ObjectDetailsAddInfoScreen,
  ObjectDetailsShareExperienceScreen,
} from '../../screens';

import {TabNavigator} from './TabNavigator';
import {MainNavigatorParamsList} from 'core/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {defaultTransition} from '../transition';
import {AuthNavigator} from './AuthNavigator';
import {useAndroidNavbarStyle, useScreenOptions} from 'navigation/hooks';
import {useSelector} from 'react-redux';
import {selectObjectShareExperienceData} from 'core/selectors';

const Stack = createNativeStackNavigator<MainNavigatorParamsList>();

export function MainNavigator() {
  useAndroidNavbarStyle();

  const screenOptions = useScreenOptions({
    animation: defaultTransition,
  });

  const objectShareExperienceData = useSelector(
    selectObjectShareExperienceData,
  );

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="TabNavigator"
        options={{headerShown: false, animation: 'fade'}}>
        {() => (
          <>
            <TabNavigator />

            {objectShareExperienceData ? (
              <ObjectDetailsShareExperienceScreen />
            ) : null}
          </>
        )}
      </Stack.Screen>
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
        options={{
          ...screenOptions,
          headerShown: false,
          presentation: 'modal',
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
