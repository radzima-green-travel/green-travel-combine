import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {AppMapScreen, ObjectDetailsScreen, ObjectsListScreen} from 'screens';

import {getAppHeaderOptions} from '../screenOptions';
import {useColorScheme} from 'core/hooks';
import {AppMapNavigatorParamsList} from 'core/types';
import {Animated} from 'react-native';

const Stack = createStackNavigator<AppMapNavigatorParamsList>();

export function AppMapNavigatior() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getAppHeaderOptions({colorScheme}),
        title: 'Карта',
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="AppMap"
        component={AppMapScreen}
      />
      <Stack.Screen
        name="ObjectDetails"
        initialParams={{
          animatedValue: new Animated.Value(0),
        }}
        component={ObjectDetailsScreen}
        options={ObjectDetailsScreen.screenOptions(colorScheme)}
      />
      <Stack.Screen name="ObjectsList" component={ObjectsListScreen} />
    </Stack.Navigator>
  );
}
