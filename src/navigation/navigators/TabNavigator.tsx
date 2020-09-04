import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'core/hooks';
import {HomeScreen} from 'screens';
import {AppMapNavigatior} from './AppMapNavigatior';
import {Icon} from 'atoms';
import {IconsNames} from 'atoms/Icon';
import {NAVIGATORS_NAMES} from 'navigation/constants';
import {HomeNavigator} from './HomeNavigator';

const Tab = createBottomTabNavigator();

type RouteParams = {
  name: string;
  icon: IconsNames;
  label: string;
  component: React.ComponentType<any>;
};

const tabs = [
  {
    name: NAVIGATORS_NAMES.homeNavigotor,
    icon: 'home',
    label: 'tabs.home',
    component: HomeNavigator,
  },
  {
    name: NAVIGATORS_NAMES.appMapNavigator,
    icon: 'marker',
    label: 'tabs.map',
    component: AppMapNavigatior,
  },
  {
    name: 'bookmarks',
    icon: 'bookmark',
    label: 'tabs.bookmarks',
    component: HomeScreen,
  },
] as Array<RouteParams>;

export function TabNavigator() {
  const {t} = useTranslation('common');
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#50A021',
        inactiveTintColor: '#777777',
      }}>
      {tabs.map(({name, icon, label, component}) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarLabel: t(label),
            tabBarIcon: ({color}: {color: string}) => (
              <Icon name={icon} color={color} size={24} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
