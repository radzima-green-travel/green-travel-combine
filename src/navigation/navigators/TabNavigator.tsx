import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useColorScheme, useTranslation} from 'core/hooks';
import {AppMapNavigatior} from './AppMapNavigatior';
import {BookmarksNavigator} from './BookmarksNavigator';
import {Icon} from 'atoms';
import {IconsNames} from 'atoms/Icon';
import {HomeNavigator} from './HomeNavigator';
import {TabNavigatorParamsList} from 'core/types';
import {COLORS} from 'assets';

const Tab = createBottomTabNavigator<TabNavigatorParamsList>();

type RouteParams = {
  name: string;
  icon: IconsNames;
  label: string;
  component: React.ComponentType<any>;
};

export function TabNavigator() {
  const {t} = useTranslation('common');
  const theme = useColorScheme();

  return (
    <Tab.Navigator
      lazy={false}
      tabBarOptions={{
        activeTintColor: theme === 'light' ? COLORS.apple : COLORS.oceanGreen,
        inactiveTintColor: theme === 'light' ? COLORS.boulder : COLORS.cullGrey,
        style: {
          backgroundColor: theme === 'light' ? COLORS.white : COLORS.oxfordBlue,
          ...(theme === 'light'
            ? {}
            : {
                borderTopWidth: 0,
                shadowColor: COLORS.logCabin,
                shadowOffset: {width: 0, height: -5},
                shadowOpacity: 0.15,
                shadowRadius: 6,
              }),
        },
      }}>
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          tabBarLabel: t('tabs.home'),
          tabBarIcon: ({color, focused}) => (
            <Icon
              additionalColor={
                theme === 'light' ? COLORS.white : COLORS.oxfordBlue
              }
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
              additionalColor={
                theme === 'light' ? COLORS.white : COLORS.oxfordBlue
              }
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
