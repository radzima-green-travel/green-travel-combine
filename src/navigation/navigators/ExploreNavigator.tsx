import React from 'react';

import {ObjectDetailsScreen, ObjectsListScreen} from '../../screens';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ExploreNavigatorParamsList} from 'core/types';
import {useScreenOptions} from '../hooks';
import {defaultTransition} from '../transition';

const Stack = createNativeStackNavigator<ExploreNavigatorParamsList>();

export function ExploreNavigatior() {
  const screenOptions = useScreenOptions({
    animation: defaultTransition,
  });

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Explore"
        component={ObjectsListScreen}
        options={{headerShown: false}}
        initialParams={{title: 'common:tabs.explore', showsTitle: true}}
      />
      <Stack.Screen
        getId={({params}) => params.objectId}
        name="ObjectDetails"
        component={ObjectDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ObjectsList"
        component={ObjectsListScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
