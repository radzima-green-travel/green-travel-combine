import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'core/hooks';
import {HomeScreen} from 'screens';
import {Icon} from 'atoms';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  const {t} = useTranslation('common');
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={'home'}
        component={HomeScreen}
        options={{
          tabBarLabel: t('tabs.home'),
          tabBarIcon: ({color}: {color: string}) => (
            <Icon name={'home'} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name={'bookmarks'}
        component={HomeScreen}
        options={{
          tabBarLabel: t('tabs.bookmarks'),
          tabBarIcon: ({color}: {color: string}) => (
            <Icon name={'bookmark'} color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
