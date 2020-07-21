import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'core/hooks';
import {HomeScreen} from 'screens';
import {Icon} from 'atoms/Icon';

const Tab = createBottomTabNavigator();

const tabs = [
  {name: 'home', label: 'tabs.home', icon: 'home'},
  {name: 'bookmarks', label: 'tabs.bookmarks', icon: 'bookmark'},
];

export function TabNavigator() {
  const {t} = useTranslation('common');
  return (
    <Tab.Navigator>
      {tabs.map(({name, label, icon}) => (
        <Tab.Screen
          key={name}
          name={name}
          component={HomeScreen}
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
