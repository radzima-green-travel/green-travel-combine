import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import {HomeScreen, ObjectsListScreen, RouteDetailsFullScreen} from 'screens';
import {Fade} from '../transitition';
import {SCREEN_NAMES} from '../constants';

import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {IconButton, Icon, HeaderSearchbar} from 'atoms';
import {useColorScheme} from 'core/hooks';

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
        headerBackTitleVisible: false,
        headerTintColor: 'white',
        cardStyle: {backgroundColor: colorScheme === 'light' ? '#fff' : '#000'},
        headerBackImage: () => <Icon name="chevron" color="white" size={32} />,
        headerBackground: () => (
          <LinearGradient
            start={{x: 0.0, y: 0.0}}
            end={{x: 1.0, y: 0.0}}
            colors={['#50A021', '#35C7A4']}
            style={StyleSheet.absoluteFill}
          />
        ),
        headerTitleStyle: {
          color: 'white',
          fontWeight: '600',
          fontSize: 16,
          lineHeight: 20,
        },
        headerLeftContainerStyle: {paddingLeft: 16},
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
