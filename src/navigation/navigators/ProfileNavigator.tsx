import React, {useState, useEffect} from 'react';
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
import {Auth, Hub} from 'aws-amplify';
import {LoadingView} from 'atoms';

const Stack = createNativeStackNavigator<ProfileNavigatorParamsList>();

export function ProfileNavigator() {
  const [user, setUser] = useState(undefined);
  const screenOptions = useScreenOptions();
  const {t} = useTranslation(['common', 'authentification']);

  const isUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    isUser();
  }, []);

  useEffect(() => {
    const signListener = data => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        isUser();
      }
    };

    Hub.listen('auth', signListener);

    return () => Hub.remove('auth', signListener);
  }, []);

  if (user === undefined) {
    return <LoadingView />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        title: t('tabs.profile'),
        animation: defaultTransition,
      }}>
      {user ? (
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
