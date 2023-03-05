import React from 'react';

import {
  AppMapScreen,
  ObjectDetailsScreen,
  ObjectsListScreen,
} from '../../screens';

import {useScreenOptions} from '../screenOptions';
import {AppMapNavigatorParamsList} from 'core/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {defaultTransition} from '../transition';
import {useTranslation} from 'react-i18next';

const Stack = createNativeStackNavigator<AppMapNavigatorParamsList>();

export function AppMapNavigatior() {
  const {t} = useTranslation('common');

  const screenOptions = useScreenOptions({
    title: t('tabs.map'),
    animation: defaultTransition,
  });
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        options={{headerShown: false}}
        name="AppMap"
        component={AppMapScreen}
      />
      <Stack.Screen
        name="ObjectDetails"
        component={ObjectDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ObjectsList" component={ObjectsListScreen} />
    </Stack.Navigator>
  );
}
