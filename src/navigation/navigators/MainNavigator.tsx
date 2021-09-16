import React, {useCallback, useState} from 'react';

import {ErrorScreen, ObjectDetailsMapScreen, SplashScreen} from 'screens';

import {TabNavigator} from './TabNavigator';
import {MainNavigatorParamsList} from 'core/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {defaultTransition} from '../transitition';
import {isIOS} from 'services/PlatformService';

const Stack = createNativeStackNavigator<MainNavigatorParamsList>();

export function MainNavigator() {
  const [splashVisible, setSplashVisible] = useState(true);
  const onAnimationEnd = useCallback(() => {
    setSplashVisible(false);
  }, []);

  const showSplashForIOS = () => {
    if (isIOS) {
      return splashVisible ? (
        <Stack.Screen
          name="Splash"
          options={{
            headerShown: false,
            animation: 'fade',
            contentStyle: {backgroundColor: 'white'},
          }}>
          {() => <SplashScreen onAnimationEnd={onAnimationEnd} />}
        </Stack.Screen>
      ) : null;
    }

    return null;
  };

  return (
    <Stack.Navigator
      screenOptions={{
        animation: defaultTransition,
      }}>
      {showSplashForIOS()}
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ObjectDetailsMap"
        component={ObjectDetailsMapScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ErrorScreen"
        component={ErrorScreen}
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      />
    </Stack.Navigator>
  );
}
