import React from 'react';
import {
  ProfileScreen,
  ProfileDetails,
  ProfileSettingsLanguage,
  ProfileSettingsTheme,
  InAppWebViewScreen,
  ObjectDetailsScreen,
  ObjectsListScreen,
  ObjectDetailsAddInfoScreen,
} from '../../screens';
import {useTranslation} from 'react-i18next';
import {useScreenOptions} from '../hooks';
import {ProfileNavigatorParamsList} from 'core/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {defaultTransition} from '../transition';
import {useColorScheme} from 'core/hooks';
import {COLORS} from 'assets';

const Stack = createNativeStackNavigator<ProfileNavigatorParamsList>();

export function ProfileNavigator() {
  const colorScheme = useColorScheme();
  const {t} = useTranslation('profile');
  const screenOptions = useScreenOptions({
    title: t('profile'),
    animation: defaultTransition,
    contentStyle: {
      backgroundColor:
        colorScheme === 'light'
          ? COLORS.light.background.secondary
          : COLORS.dark.background.secondary,
    },
  });

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
      <Stack.Screen
        name="ProfileSettingsLanguage"
        component={ProfileSettingsLanguage}
        options={{title: t('language')}}
      />
      <Stack.Screen
        name="ProfileSettingsTheme"
        component={ProfileSettingsTheme}
        options={{title: t('theme')}}
      />
      <Stack.Screen name="InAppWebView" component={InAppWebViewScreen} />
      <Stack.Screen
        getId={({params}) => params.objectId}
        name="ObjectDetails"
        component={ObjectDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ObjectDetailsAddInfo"
        component={ObjectDetailsAddInfoScreen}
        options={{headerShown: false, presentation: 'modal'}}
      />
      <Stack.Screen name="ObjectsList" component={ObjectsListScreen} />
    </Stack.Navigator>
  );
}
