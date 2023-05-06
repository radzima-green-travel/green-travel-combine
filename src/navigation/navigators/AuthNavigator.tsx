import React, {useCallback} from 'react';

import {
  AuthMethodSelectionScreen,
  CheckEmailScreen,
  EmailValidationScreen,
  SignInPasswordScreen,
  SignUpFormScreen,
  RestorePasswordScreen,
  NewPasswordScreen,
  InAppWebViewScreen,
  ChangePasswordScreen,
} from '../../screens';
import {HeaderCancelButton} from 'atoms';

import {useTranslation} from 'react-i18next';
import {useScreenOptions} from '../screenOptions';
import {AuthNavigatorParamsList} from 'core/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {defaultTransition} from '../transition';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator<AuthNavigatorParamsList>();

export function AuthNavigator() {
  const {t} = useTranslation('authentification');
  const navigation = useNavigation();
  const onHeaderRightPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const screenOptions = useScreenOptions({
    withBottomInset: true,
    title: '',
    animation: defaultTransition,
    headerRight: () => <HeaderCancelButton onPress={onHeaderRightPress} />,
    orientation: 'portrait',
  });

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="CheckEmail" component={CheckEmailScreen} />
      <Stack.Screen
        name="AuthMethodSelection"
        component={AuthMethodSelectionScreen}
        options={AuthMethodSelectionScreen.screenOptions}
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
      <Stack.Screen name="InAppWebView" component={InAppWebViewScreen} />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={ChangePasswordScreen.screenOptions}
      />
    </Stack.Navigator>
  );
}
