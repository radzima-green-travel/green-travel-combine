import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RoutesNavigatorParamsList} from 'core/types';
import React from 'react';
import {RoutesScreen} from 'screens';

const Stack = createNativeStackNavigator<RoutesNavigatorParamsList>();

export function RoutesNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Routes" component={RoutesScreen} />
    </Stack.Navigator>
  );
}
