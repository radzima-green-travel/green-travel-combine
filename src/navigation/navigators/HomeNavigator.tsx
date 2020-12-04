import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import {HomeScreen, RouteDetailsFullScreen, ObjectsListScreen} from 'screens';
import {Fade} from '../transitition';

import {StyleSheet} from 'react-native';
import {IconButton, HeaderSearchbar} from 'atoms';
import {useColorScheme, useTranslation} from 'core/hooks';
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
  const {t} = useTranslation('home');
  return (
    <Stack.Navigator
      screenOptions={{
        ...getAppHeaderOptions({colorScheme}),
        title: t('headerTitle'),
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <IconButton
              style={styles.iconButton}
              onPress={() => navigation.navigate('Search')}
              icon={{size: 24, name: 'search', color: 'white'}}
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
      <Stack.Screen
        name="RouteDetails"
        component={RouteDetailsFullScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        options={{
          ...getAppHeaderOptions({colorScheme}),
        }}
        name="ObjectsList"
        component={ObjectsListScreen}
      />
    </Stack.Navigator>
  );
}
