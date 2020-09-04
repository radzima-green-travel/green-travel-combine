import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import {HomeScreen, ObjectsListScreen, RouteDetailsFullScreen} from 'screens';
import {Fade} from '../transitition';
import {SCREEN_NAMES} from '../constants';

import {StyleSheet} from 'react-native';
import {IconButton, HeaderSearchbar} from 'atoms';
import {useColorScheme} from 'core/hooks';
import {getAppHeaderOptions} from '../screenOptions';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  iconButton: {
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: 'transparent',
  },
});

export function HomeNavigator() {
  const colorScheme = useColorScheme();
  return (
    <Stack.Navigator
      screenOptions={{
        ...getAppHeaderOptions({colorScheme}),
        title: 'Radzima',
      }}>
      <Stack.Screen
        name={SCREEN_NAMES.home}
        component={HomeScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <IconButton
              style={styles.iconButton}
              onPress={() => navigation.navigate(SCREEN_NAMES.search)}
              icon={{name: 'search', color: 'white'}}
            />
          ),
        })}
      />
      <Stack.Screen
        name={SCREEN_NAMES.search}
        component={View}
        options={{
          headerTitle: () => <HeaderSearchbar />,
          headerTitleContainerStyle: {
            width: '100%',
            paddingLeft: 48,
            paddingRight: 16,
          },
          ...Fade,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.objectsList}
        component={ObjectsListScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.routeDetails}
        component={RouteDetailsFullScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
