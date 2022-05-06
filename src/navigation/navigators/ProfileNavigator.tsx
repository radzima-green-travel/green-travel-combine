import React from 'react';
import {
  EmailValidationScreen,
  ProfileScreen,
  RestorePasswordScreen,
} from 'screens';
import {TabAuthNavigator} from './TabAuthNavigator';
import {useTranslation} from 'react-i18next';
import {useScreenOptions} from '../screenOptions';
import {ProfileNavigatorParamsList} from 'core/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {defaultTransition} from '../transition';

const Stack = createNativeStackNavigator<ProfileNavigatorParamsList>();

export function ProfileNavigator() {
  const screenOptions = useScreenOptions();
  const {t} = useTranslation(['common', 'authentification']);

  // TODO: rewrite this condition when backend validation will be done
  let isSignedIn = false;

  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        title: t('tabs.profile'),
        animation: defaultTransition,
      }}>
      {isSignedIn ? (
        <Stack.Screen name="Profile" component={ProfileScreen} />
      ) : (
        <>
          <Stack.Screen name="TabAuthNavigator" component={TabAuthNavigator} />
          <Stack.Screen
            name="EmailValidation"
            component={EmailValidationScreen}
          />
          <Stack.Screen
            name="RestorePassword"
            component={RestorePasswordScreen}
            options={{title: t('restorePassword', {ns: 'authentification'})}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
