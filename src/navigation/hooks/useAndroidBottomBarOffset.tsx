import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomTabBar, BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {COLORS} from 'assets';
import {useColorScheme} from 'core/hooks';

// [android] handles case when system navigation buttons are barely visible

export const useAndroidBottomBarOffset = () => {
  const theme = useColorScheme();
  const {bottom, top, right, left} = useSafeAreaInsets();

  const safeAreaInsets = {bottom: 0, top, right, left};

  const tabBarStyle = {paddingBottom: 3};

  const tabBar = useCallback(
    (props: BottomTabBarProps) => (
      <>
        <BottomTabBar {...props} />
        <View
          style={{
            height: bottom,
            backgroundColor: theme === 'light' ? COLORS.white : COLORS.silver,
          }}
        />
      </>
    ),
    [bottom, theme],
  );

  return {
    tabBar,
    tabBarStyle,
    safeAreaInsets,
  };
};
