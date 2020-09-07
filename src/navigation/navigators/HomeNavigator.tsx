import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import {HomeScreen, ObjectsListScreen, RouteDetailsFullScreen} from 'screens';
import {Fade} from '../transitition';

import {StyleSheet} from 'react-native';
import {IconButton, HeaderSearchbar} from 'atoms';
import {useColorScheme} from 'core/hooks';
import {HomeNavigatorParamsList} from 'core/types';
import {getAppHeaderOptions} from '../screenOptions';

const Stack = createStackNavigator<HomeNavigatorParamsList>();

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
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <IconButton
              style={styles.iconButton}
              onPress={() => navigation.navigate('Search')}
              icon={{name: 'search', color: 'white'}}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Search"
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
      <Stack.Screen name="ObjectsList" component={ObjectsListScreen} />
      <Stack.Screen
        name="RouteDetails"
        component={RouteDetailsFullScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
