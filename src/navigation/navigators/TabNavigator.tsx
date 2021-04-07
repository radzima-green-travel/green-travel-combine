import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'core/hooks';
import {AppMapNavigatior} from './AppMapNavigatior';
import {BookmarksNavigator} from './BookmarksNavigator';
import {Icon} from 'atoms';
import {IconsNames} from 'atoms/Icon';
import {HomeNavigator} from './HomeNavigator';
import {TabNavigatorParamsList} from 'core/types';

const Tab = createBottomTabNavigator<TabNavigatorParamsList>();

type RouteParams = {
  name: string;
  icon: IconsNames;
  label: string;
  component: React.ComponentType<any>;
};

export function TabNavigator() {
  const {t} = useTranslation('common');

  return (
    <Tab.Navigator
      lazy={false}
      tabBarOptions={{
        activeTintColor: '#50A021',
        inactiveTintColor: '#777777',
      }}>
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          tabBarLabel: t('tabs.home'),
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'homeFilled' : 'home'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AppMapNavigator"
        component={AppMapNavigatior}
        options={{
          tabBarLabel: t('tabs.map'),
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'markerFilled' : 'marker'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="BookmarksNavigator"
        component={BookmarksNavigator}
        options={{
          tabBarLabel: t('tabs.bookmarks'),
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'bookmarkFilled' : 'bookmark'}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
