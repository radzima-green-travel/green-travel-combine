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
import {isAndroid} from 'services/PlatformService';
import {useAndroidBottomBarOffset} from '../hooks';

const Tab = createBottomTabNavigator<TabNavigatorParamsList>();

export function TabNavigator() {
  const {t} = useTranslation('common');
  const theme = useColorScheme();
  const isMyProfileFeatureEnabled = useSelector(
    selectIsMyProfileFeatureEnabled,
  );

  const {tabBar, safeAreaInsets, tabBarStyle} = useAndroidBottomBarOffset();

  return (
    <Tab.Navigator
      tabBar={isAndroid ? props => tabBar(props) : undefined}
      safeAreaInsets={isAndroid ? safeAreaInsets : undefined}
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
          ...(isAndroid ? tabBarStyle : {}),
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
          tabBarTestID: TestIDs.TabBarItemMap,
          tabBarAccessibilityLabel: TestIDs.TabBarItemMap,
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
      ) : null}
    </Tab.Navigator>
  );
}
