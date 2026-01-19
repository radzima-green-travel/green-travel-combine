import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'core/hooks';
import React from 'react';
import { RouteListScreen } from '../../screens/RouteList';
import { RouteScreen } from '../../screens/Route';
import { useScreenOptions } from '../hooks/useScreenOptions';
import { Routes } from '@features/routes';
import { AddObjectsToRoute } from '../../screens/AddObjectsToRoute/AddObjectsToRoute';

const Stack = createNativeStackNavigator<Routes.NavigatorParamsList>();

export function RoutesNavigator() {
  const { t } = useTranslation('routes');
  const screenOptions = useScreenOptions();

  return (
    <Routes.Provider>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Routes"
          component={RouteListScreen}
          options={{ title: t('routeList.title') }}
        />
        <Stack.Screen name="Route" component={RouteScreen} />
        <Stack.Screen name="AddObjectsToRoute" component={AddObjectsToRoute} />
      </Stack.Navigator>
    </Routes.Provider>
  );
}
