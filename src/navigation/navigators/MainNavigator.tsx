import React from 'react';

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

import {TabNavigator} from './TabNavigator';
import {MainNavigatorParamsList} from 'core/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {defaultTransition} from '../transition';
import {AuthNavigator} from './AuthNavigator';
import {useTranslation, useColorScheme} from 'core/hooks';
import {useAndroidNavbarStyle, useScreenOptions} from 'navigation/hooks';
import {useSelector} from 'react-redux';
import {selectObjectShareExperienceData} from 'core/selectors';
import {COLORS} from 'assets';

const Stack = createNativeStackNavigator<MainNavigatorParamsList>();

export function MainNavigator() {
  useAndroidNavbarStyle();
  const {t: tFiters} = useTranslation('filters');
  const colorScheme = useColorScheme();

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
        options={{headerShown: false, presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
}
