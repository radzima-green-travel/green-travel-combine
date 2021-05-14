import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import {
  HomeScreen,
  ObjectDetailsScreen,
  ObjectsListScreen,
  CategoriesListScreen,
  SearchScreen,
} from 'screens';

import {StyleSheet} from 'react-native';
import {IconButton} from 'atoms';
import {useColorScheme, useTranslation} from 'core/hooks';
import {HomeNavigatorParamsList} from 'core/types';
import {getAppHeaderOptions} from '../screenOptions';
import {COLORS} from 'assets';

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
      headerMode="screen"
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
              icon={{
                size: 24,
                name: 'search',
                color: COLORS.white,
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={SearchScreen.screenOptions}
      />
      <Stack.Screen
        name="ObjectDetails"
        component={ObjectDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ObjectsList" component={ObjectsListScreen} />
      <Stack.Screen
        options={{
          ...getAppHeaderOptions({colorScheme}),
        }}
        name="CategoriesList"
        component={CategoriesListScreen}
      />
    </Stack.Navigator>
  );
}
