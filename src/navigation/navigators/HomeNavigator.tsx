import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeScreen,
  ObjectDetailsScreen,
  ObjectsListScreen,
  CategoriesListScreen,
  SearchScreen,
} from '../../screens';

import {useTranslation} from 'core/hooks';
import {HomeNavigatorParamsList} from 'core/types';
import {useScreenOptions} from '../hooks';
import {defaultTransition} from '../transition';
import {View} from 'react-native';
import {Text} from 'react-native';

const Stack = createNativeStackNavigator<HomeNavigatorParamsList>();

export function HomeNavigator() {
  const {t} = useTranslation('home');

  const screenOptions = useScreenOptions({
    title: t('headerTitle'),
    animation: defaultTransition,
  });

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={HomeScreen.screenOptions}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={props => ({
          ...SearchScreen.screenOptions(props),
          animation: 'fade',
        })}
      />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name="Filter"
          component={() => (
            <View>
              <Text>TEST</Text>
            </View>
          )}
        />
      </Stack.Group>
      <Stack.Screen
        getId={({params}) => params.objectId}
        name="ObjectDetails"
        initialParams={{
          analytics: {
            fromScreenName: 'DeepLink',
          },
        }}
        component={ObjectDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ObjectsList" component={ObjectsListScreen} />
      <Stack.Screen name="CategoriesList" component={CategoriesListScreen} />
    </Stack.Navigator>
  );
}
