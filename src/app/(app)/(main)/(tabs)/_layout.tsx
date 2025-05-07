import {COLORS} from 'assets';
import {Icon} from 'atoms';
import {useColorScheme, useTranslation} from 'core/hooks';
import {Tabs} from 'expo-router';
import {analyticsService} from 'services/AnalyticsService';
import {IconsNames} from 'components/atoms/Icon';
import React from 'react';

export default function TabsLayout() {
  const theme = useColorScheme();
  const {t} = useTranslation('common');

  const screenContainerStyle = {
    backgroundColor: COLORS[theme].background.primary,
  };

  const screenOptions = {
    headerShown: false,
    tabBarActiveTintColor: COLORS[theme].text.accent,
    tabBarInactiveTintColor: COLORS[theme].text.secondary,
    tabBarStyle: {
      backgroundColor: COLORS[theme].background.tabBar,
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
  };

  return (
    <Tabs
      sceneContainerStyle={screenContainerStyle}
      screenOptions={screenOptions}>
      <Tabs.Screen
        name="(ahome)"
        listeners={{
          tabPress: () => {
            analyticsService.logEvent('navi_home_event');
          },
        }}
        options={{
          tabBarTestID: 'tabBarItemMain',
          tabBarAccessibilityLabel: 'tabBarItemMain',
          tabBarLabel: t('tabs.home'),
          tabBarIcon: HomeTabIcon,
        }}
      />
      <Tabs.Screen
        name="(map)"
        listeners={{
          tabPress: () => {
            analyticsService.logEvent('navi_map_event');
          },
        }}
        options={{
          tabBarTestID: 'tabBarItemMap',
          tabBarAccessibilityLabel: 'tabBarItemMap',
          tabBarLabel: t('tabs.map'),
          tabBarIcon: MapTabIcon,
        }}
      />
      <Tabs.Screen
        name="(bookmarks)"
        listeners={{
          tabPress: () => {
            analyticsService.logEvent('navi_bookmarks_event');
          },
        }}
        options={{
          tabBarTestID: 'tabBarItemFavorites',
          tabBarAccessibilityLabel: 'tabBarItemFavorites',
          tabBarLabel: t('tabs.bookmarks'),
          tabBarIcon: BookmarksTabIcon,
        }}
      />
      <Tabs.Screen
        name="(profile)"
        listeners={{
          tabPress: () => {
            analyticsService.logEvent('navi_profile_event');
          },
        }}
        options={{
          tabBarTestID: 'tabBarItemProfile',
          tabBarAccessibilityLabel: 'tabBarItemProfile',
          tabBarLabel: t('tabs.profile'),
          tabBarIcon: ProfileTabIcon,
        }}
      />
    </Tabs>
  );
}

const tabIconFactory = (iconName: IconsNames) => {
  return ({color}: {color: string}) => (
    <Icon name={iconName} color={color} size={24} />
  );
};

const HomeTabIcon = tabIconFactory('home');
const MapTabIcon = tabIconFactory('marker');
const BookmarksTabIcon = tabIconFactory('bookmarkTab');
const ProfileTabIcon = tabIconFactory('avatar');
