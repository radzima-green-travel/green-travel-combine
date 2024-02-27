import React from 'react';

import {
  AppMapScreen,
  ObjectDetailsAddInfoScreen,
  ObjectDetailsScreen,
  ObjectsListScreen,
} from '../../screens';

import {useScreenOptions} from '../hooks';
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
