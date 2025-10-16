import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useColorScheme, useTranslation} from 'core/hooks';
import {ExploreNavigatior} from './ExploreNavigator';
import {BookmarksNavigator} from './BookmarksNavigator';
import {ProfileNavigator} from './ProfileNavigator';
import {Icon} from 'atoms';
import {HomeNavigator} from './HomeNavigator';
import {TabNavigatorParamsList} from 'core/types';
import {COLORS} from 'assets';
import {analyticsService} from 'services/AnalyticsService';

const Tab = createBottomTabNavigator<TabNavigatorParamsList>();

export function TabNavigator() {
  const {t} = useTranslation('common');
  const theme = useColorScheme();

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor:
          theme === 'light'
            ? COLORS.light.background.primary
            : COLORS.dark.background.primary,
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor:
          theme === 'light'
            ? COLORS.light.text.accent
            : COLORS.dark.text.accent,
        tabBarInactiveTintColor:
          theme === 'light'
            ? COLORS.light.text.secondary
            : COLORS.dark.text.secondary,

        tabBarStyle: {
          backgroundColor:
            theme === 'light'
              ? COLORS.light.background.tabBar
              : COLORS.dark.background.tabBar,
          ...(theme === 'light'
            ? {
                borderTopWidth: 0,
              }
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
          tabBarTestID: 'tabBarItemMain',
          tabBarAccessibilityLabel: 'tabBarItemMain',
          tabBarLabel: t('tabs.home'),
          tabBarIcon: ({color}) => (
            <Icon name={'home'} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="ExploreNavigator"
        component={ExploreNavigatior}
        listeners={{
          tabPress: () => {
            analyticsService.logEvent('navi_map_event');
          },
        }}
        options={{
          lazy: false,
          tabBarTestID: 'tabBarItemMap',
          tabBarAccessibilityLabel: 'tabBarItemMap',
          tabBarLabel: t('tabs.explore'),
          tabBarIcon: ({color}) => (
            <Icon name={'search'} color={color} size={24} />
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
          tabBarTestID: 'tabBarItemFavorites',
          tabBarAccessibilityLabel: 'tabBarItemFavorites',
          tabBarLabel: t('tabs.bookmarks'),
          tabBarIcon: ({color}) => (
            <Icon name={'bookmarkTab'} color={color} size={24} />
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
          tabBarTestID: 'tabBarItemProfile',
          tabBarAccessibilityLabel: 'tabBarItemProfile',
          tabBarLabel: t('tabs.profile'),
          tabBarIcon: ({color}) => (
            <Icon name={'avatar'} color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
