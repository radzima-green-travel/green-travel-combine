import React from 'react';
import {
  ProfileScreen,
  ProfileDetails,
  ProfileSettingsTheme,
} from '../../screens';
import {useTranslation} from 'react-i18next';
import {useScreenOptions} from '../screenOptions';
import {ProfileNavigatorParamsList} from 'core/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {defaultTransition} from '../transition';

const Stack = createNativeStackNavigator<ProfileNavigatorParamsList>();

export function ProfileNavigator() {
  const screenOptions = useScreenOptions();
  const {t} = useTranslation('profile');

  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        title: t('profile'),
        animation: defaultTransition,
      }}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="ProfileDetails"
        component={ProfileDetails}
        options={screenOptions}
      />
      <Stack.Screen
        name="ProfileSettingsTheme"
        component={ProfileSettingsTheme}
        options={{...screenOptions, title: t('theme')}}
      />
    </Stack.Navigator>
  );
}
