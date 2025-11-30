import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, HeaderTitle } from 'atoms';
import { COLORS } from 'assets';
import { useColorScheme } from 'core/hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  NativeStackNavigationOptions,
  type NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import { Header } from 'containers';
import type { UseHeaderProps } from 'core/hooks/useHeader';

type UseScreenOptionsProps = {
  withBottomInset?: boolean;
  legacyDesign?: boolean;
} & Partial<NativeStackNavigationOptions>;

export function useScreenOptions({
  withBottomInset = false,
  legacyDesign = false,
  ...customOptions
}: UseScreenOptionsProps = {}) {
  const colorScheme = useColorScheme();
  const { bottom } = useSafeAreaInsets();

  return () =>
    ({
      contentStyle: {
        backgroundColor:
          colorScheme === 'light'
            ? COLORS.light.background.primary
            : COLORS.dark.background.primary,
        ...(withBottomInset ? { paddingBottom: bottom } : {}),
      },
      headerStyle: legacyDesign
        ? {
            backgroundColor:
              colorScheme === 'light'
                ? COLORS.light.background.navBar
                : COLORS.dark.background.navBar,
          }
        : undefined,
      // Default header has this issue starting from Expo 53
      // https://github.com/react-navigation/react-navigation/issues/11353
      header: props => renderHeader({ stackHeaderProps: props, legacyDesign }),
      ...customOptions,
    }) as NativeStackNavigationOptions;
}

const renderHeader = ({
  stackHeaderProps,
  legacyDesign,
}: {
  legacyDesign: boolean;
  stackHeaderProps: NativeStackHeaderProps & {
    options?: { customOptions?: UseHeaderProps };
  };
}) => {
  const { options } = stackHeaderProps;
  const { headerRight } = options;

  if (!legacyDesign) {
    return (
      <Header
        title={options?.title}
        replacesDefaultHeader={false}
        overlaysContent={options?.presentation !== 'modal'}
        {...options?.customOptions}
      />
    );
  }

  return (
    <Header
      style={StyleSheet.compose(options?.headerStyle, { paddingTop: 8 })}
      replacesDefaultHeader={false}
      overlaysContent={false}
      titleAlign="center"
      statusbarStyle="light"
      leftSlot={({ canGoBack, navigation }) => {
        return (
          canGoBack && (
            <TouchableOpacity
              testID="backButton"
              hitSlop={15}
              activeOpacity={0.8}
              onPress={navigation.goBack}>
              <Icon name="chevronMediumLeft" color="white" size={20} />
            </TouchableOpacity>
          )
        );
      }}
      titleSlot={() => {
        return (
          !!options.title && (
            <HeaderTitle
              testID="headerTitle"
              title={options.title}
              tintColor={options.headerTintColor}
            />
          )
        );
      }}
      rightSlot={({ canGoBack, navigation }) => {
        return !!headerRight && headerRight({ canGoBack, tintColor: '' });
      }}
    />
  );
};
