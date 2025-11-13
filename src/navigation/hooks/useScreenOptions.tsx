import React from 'react';
import { ColorSchemeName, TouchableOpacity } from 'react-native';
import { Icon, HeaderTitle, CustomHeader } from 'atoms';
import { COLORS } from 'assets';
import { useColorScheme } from 'core/hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { getPlatformsTestID } from 'core/helpers';

export interface IOptions {
  colorScheme: ColorSchemeName;
}

type IScreeOptions = {
  withBottomInset?: boolean;
} & Partial<NativeStackNavigationOptions>;

export function useScreenOptions({
  withBottomInset = false,
  ...customOptions
}: IScreeOptions = {}) {
  const colorScheme = useColorScheme();
  const { bottom } = useSafeAreaInsets();

  return ({ navigation }) =>
    ({
      contentStyle: {
        backgroundColor:
          colorScheme === 'light'
            ? COLORS.light.background.primary
            : COLORS.dark.background.primary,
        ...(withBottomInset ? { paddingBottom: bottom } : {}),
      },
      headerBackTitleVisible: false,
      headerTintColor:
        colorScheme === 'light' ? COLORS.white : COLORS.altoForDark,
      headerStyle: {
        backgroundColor:
          colorScheme === 'light'
            ? COLORS.light.background.navBar
            : COLORS.dark.background.navBar,
      },
      headerShadowVisible: false,
      headerBackVisible: false,
      // Default header has this issue starting from Expo 53
      // https://github.com/react-navigation/react-navigation/issues/11353
      header: props => <CustomHeader {...props} withOverlay={false} />,
      headerLeft: props => {
        return props.canGoBack ? (
          <TouchableOpacity
            {...getPlatformsTestID('backButton')}
            hitSlop={{ left: 15, right: 15, bottom: 15, top: 15 }}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}>
            <Icon name="chevronMediumLeft" color="white" size={20} />
          </TouchableOpacity>
        ) : null;
      },
      headerTitle: props => (
        <HeaderTitle
          testID="headerTitle"
          title={props.children}
          tintColor={props.tintColor}
        />
      ),
      ...customOptions,
    }) as NativeStackNavigationOptions;
}
