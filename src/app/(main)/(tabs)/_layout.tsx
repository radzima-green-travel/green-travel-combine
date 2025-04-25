import {COLORS} from 'assets';
import {Icon} from 'atoms';
import {useColorScheme, useTranslation} from 'core/hooks';
import {Tabs} from 'expo-router';
import {analyticsService} from 'services/AnalyticsService';

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
        name="(home)"
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
          tabBarIcon: ({color}) => (
            <Icon name={'marker'} color={color} size={24} />
          ),
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
          tabBarIcon: ({color}) => (
            <Icon name={'bookmarkTab'} color={color} size={24} />
          ),
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
          tabBarIcon: ({color}) => (
            <Icon name={'avatar'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
