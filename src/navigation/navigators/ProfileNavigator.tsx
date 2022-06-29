import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  EmailValidationScreen,
  NewPasswordScreen,
  ProfileScreen,
  RestorePasswordScreen,
} from 'screens';
import {TabAuthNavigator} from './TabAuthNavigator';
import {useTranslation} from 'react-i18next';
import {useScreenOptions} from '../screenOptions';
import {ProfileNavigatorParamsList} from 'core/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {selectUserAuthorized} from 'core/selectors';
import {userAuthorizedRequest} from 'core/reducers';
import {defaultTransition} from '../transition';
import {Hub} from 'aws-amplify';
import {LoadingView} from 'atoms';

const Stack = createNativeStackNavigator<ProfileNavigatorParamsList>();

export function ProfileNavigator() {
  const screenOptions = useScreenOptions();
  const {t} = useTranslation(['common', 'authentification']);
  const dispatch = useDispatch();

  const userAuthorized = useSelector(selectUserAuthorized);

  useEffect(() => {
    dispatch(userAuthorizedRequest());
  }, [dispatch]);

  useEffect(() => {
    const signListener = data => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        dispatch(userAuthorizedRequest());
      }
    };

    Hub.listen('auth', signListener);

    return () => Hub.remove('auth', signListener);
  }, [dispatch]);

  if (userAuthorized === undefined) {
    return <LoadingView />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        title: t('tabs.profile'),
        animation: defaultTransition,
      }}>
      {userAuthorized ? (
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
          <Stack.Screen
            name="NewPassword"
            component={NewPasswordScreen}
            options={{title: t('restorePassword', {ns: 'authentification'})}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
