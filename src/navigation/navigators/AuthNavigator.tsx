import React from 'react';

import {
  CheckEmailScreen,
  EmailValidationScreen,
  SignInPasswordScreen,
  SignUpFormScreen,
  RestorePasswordScreen,
  NewPasswordScreen,
} from '../../screens';

import {useTranslation} from 'react-i18next';
import {useScreenOptions} from '../screenOptions';
import {AuthNavigatorParamsList} from 'core/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {defaultTransition} from '../transition';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<AuthNavigatorParamsList>();

export function AuthNavigator() {
  const screenOptions = useScreenOptions();
  const {t} = useTranslation('common');
  const {bottom} = useSafeAreaInsets();

  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        title: t('login/Register'),
        contentStyle: {marginBottom: bottom},
        animation: defaultTransition,
      }}>
      <Stack.Screen name="CheckEmail" component={CheckEmailScreen} />
      <Stack.Screen name="SignInPassword" component={SignInPasswordScreen} />
      <Stack.Screen name="SignUpForm" component={SignUpFormScreen} />
      <Stack.Screen name="CodeVerification" component={EmailValidationScreen} />
      <Stack.Screen name="EmailValidation" component={EmailValidationScreen} />

      <Stack.Screen
        name="RestorePassword"
        component={RestorePasswordScreen}
        options={{title: t('restorePassword', {ns: 'authentification'})}}
      />
      <Stack.Screen
        name="NewPassword"
        component={NewPasswordScreen}
        options={{title: t('restorePassword', {ns: 'authentification'})}}
      />
    </Stack.Navigator>
  );
}
