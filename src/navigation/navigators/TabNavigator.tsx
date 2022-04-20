import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useColorScheme, useTranslation} from 'core/hooks';
import {AppMapNavigatior} from './AppMapNavigatior';
import {BookmarksNavigator} from './BookmarksNavigator';
import {ProfileNavigator} from './ProfileNavigator';
import {Icon} from 'atoms';
import {IconsNames} from 'atoms/Icon';
import {HomeNavigator} from './HomeNavigator';
import {TabNavigatorParamsList} from 'core/types';
import {COLORS} from 'assets';
import {analyticsService} from 'services/AnalyticsService';

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
      sceneContainerStyle={{
        backgroundColor: theme === 'light' ? COLORS.white : COLORS.background,
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor:
          theme === 'light' ? COLORS.apple : COLORS.oceanGreen,
        tabBarInactiveTintColor:
          theme === 'light' ? COLORS.boulder : COLORS.cullGrey,

        tabBarStyle: {
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
        listeners={{
          tabPress: () => {
            analyticsService.logEvent('navi_home_event');
          },
        }}
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
        listeners={{
          tabPress: () => {
            analyticsService.logEvent('navi_map_event');
          },
        }}
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
        listeners={{
          tabPress: () => {
            analyticsService.logEvent('navi_bookmarks_event');
          },
        }}
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
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        listeners={{
          tabPress: () => {
            analyticsService.logEvent('navi_profile_event');
          },
        }}
        options={{
          tabBarLabel: t('tabs.profile'),
          tabBarIcon: ({color, focused}) => (
            <Icon
              additionalColor={
                theme === 'light' ? COLORS.white : COLORS.oxfordBlue
              }
              name={focused ? 'avatarFilled' : 'avatar'}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
