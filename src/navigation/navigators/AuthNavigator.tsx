import React from 'react';

import {
  AuthMethodSelectionScreen,
  CheckEmailScreen,
  EmailValidationScreen,
  SignInPasswordScreen,
  SignUpFormScreen,
  RestorePasswordScreen,
  NewPasswordScreen,
  SocialLoginInAppBrowserScreen,
} from '../../screens';

import {useTranslation} from 'react-i18next';
import {useScreenOptions} from '../screenOptions';
import {AuthNavigatorParamsList} from 'core/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {defaultTransition} from '../transition';

const Stack = createNativeStackNavigator<AuthNavigatorParamsList>();

export function AuthNavigator() {
  const {t} = useTranslation('authentification');

  const screenOptions = useScreenOptions({
    withBottomInset: true,
    title: t('login/Register'),
    animation: defaultTransition,
  });

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="CheckEmail" component={CheckEmailScreen} />
      <Stack.Screen
        name="AuthMethodSelection"
        component={AuthMethodSelectionScreen}
      />
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
      <Stack.Screen
        name="SocialLoginInAppBrowser"
        component={SocialLoginInAppBrowserScreen}
      />
    </Stack.Navigator>
  );
}
