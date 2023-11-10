import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useColorScheme, useTranslation} from 'core/hooks';
import {AppMapNavigatior} from './AppMapNavigatior';
import {BookmarksNavigator} from './BookmarksNavigator';
import {ProfileNavigator} from './ProfileNavigator';
import {Icon} from 'atoms';
import {HomeNavigator} from './HomeNavigator';
import {TabNavigatorParamsList, TestIDs} from 'core/types';
import {COLORS} from 'assets';
import {analyticsService} from 'services/AnalyticsService';
import {useSelector} from 'react-redux';
import {selectIsMyProfileFeatureEnabled} from 'core/selectors';

const Tab = createBottomTabNavigator<TabNavigatorParamsList>();

export function TabNavigator() {
  const {t} = useTranslation('common');
  const theme = useColorScheme();
  const isMyProfileFeatureEnabled = useSelector(
    selectIsMyProfileFeatureEnabled,
  );

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
          tabBarTestID: TestIDs.TabBarItemMain,
          tabBarAccessibilityLabel: TestIDs.TabBarItemMain,
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
        listeners={{
          tabPress: () => {
            analyticsService.logEvent('navi_map_event');
          },
        }}
        options={{
          tabBarTestID: TestIDs.TabBarItemMap,
          tabBarAccessibilityLabel: TestIDs.TabBarItemMap,
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
        listeners={{
          tabPress: () => {
            analyticsService.logEvent('navi_bookmarks_event');
          },
        }}
        options={{
          tabBarTestID: TestIDs.TabBarItemFavorites,
          tabBarAccessibilityLabel: TestIDs.TabBarItemFavorites,
          tabBarLabel: t('tabs.bookmarks'),
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'bookmarkTabFilled' : 'bookmarkTab'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      {isMyProfileFeatureEnabled ? (
        <Tab.Screen
          name="ProfileNavigator"
          component={ProfileNavigator}
          listeners={{
            tabPress: () => {
              analyticsService.logEvent('navi_profile_event');
            },
          }}
          options={{
            tabBarTestID: TestIDs.TabBarItemProfile,
            tabBarAccessibilityLabel: TestIDs.TabBarItemProfile,
            tabBarLabel: t('tabs.profile'),
            tabBarIcon: ({color, focused}) => (
              <Icon
                name={focused ? 'avatarFilled' : 'avatar'}
                color={color}
                size={24}
              />
            ),
          }}
        />
      ) : null}
    </Tab.Navigator>
  );
}
