import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {HomeScreen} from 'screens';

import {SCREEN_NAMES} from '../constants';

import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {IconButton, Icon, HeaderSearchbar} from 'atoms';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  iconButton: {
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: 'transparent',
  },
});

export function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackground: () => (
          <LinearGradient
            start={{x: 0.0, y: 0.0}}
            end={{x: 1.0, y: 0.0}}
            colors={['#50A021', '#35C7A4']}
            style={StyleSheet.absoluteFill}
          />
        ),
        headerStyle: {height: 72},
        headerTitleStyle: {
          color: 'white',
          fontWeight: '600',
          fontSize: 16,
          lineHeight: 20,
        },
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
        component={HomeScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: () => <HeaderSearchbar />,
          headerTitleContainerStyle: {
            width: '100%',
            paddingLeft: 48,
            paddingRight: 16,
          },
          headerBackImage: () => (
            <Icon name="chevron" color="white" size={32} />
          ),
          headerLeftContainerStyle: {paddingLeft: 16},
        }}
      />
      <Stack.Screen name={SCREEN_NAMES.activities} component={HomeScreen} />
    </Stack.Navigator>
  );
}
