import React from 'react';

import {ObjectDetailsScreen, ObjectsListScreen} from '../../screens';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ExploreNavigatorParamsList} from 'core/types';
import {useTranslation} from 'react-i18next';
import {useScreenOptions} from '../hooks';
import {defaultTransition} from '../transition';

const Stack = createNativeStackNavigator<ExploreNavigatorParamsList>();

export function ExploreNavigatior() {
  const {t} = useTranslation('common');

  const screenOptions = useScreenOptions({
    title: t('tabs.map'),
    animation: defaultTransition,
  });

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Explore"
        component={ObjectsListScreen}
        options={{headerShown: false}}
        initialParams={{title: t('tabs.explore'), showsTitle: true}}
      />
      <Stack.Screen
        getId={({params}) => params.objectId}
        name="ObjectDetails"
        component={ObjectDetailsScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen name="ObjectsList" component={ObjectsListScreen} />
    </Stack.Navigator>
  );
}
