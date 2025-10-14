import React from 'react';
import {ColorSchemeName} from 'react-native';
import {HeaderTitle} from 'atoms';
import {COLORS} from 'assets';
import {useColorScheme} from 'core/hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {HeaderBackButton} from 'molecules';

export interface IOptions {
  colorScheme: ColorSchemeName;
}

type IScreeOptions = {
  withBottomInset?: boolean;
} & Partial<NativeStackNavigationOptions>;

export function useNewScreenOptions({
  withBottomInset = false,
  ...customOptions
}: IScreeOptions = {}) {
  const colorScheme = useColorScheme();
  const {bottom} = useSafeAreaInsets();

  return ({navigation}) =>
    ({
      contentStyle: {
        backgroundColor:
          colorScheme === 'light'
            ? COLORS.light.background.primary
            : COLORS.dark.background.primary,
        ...(withBottomInset ? {paddingBottom: bottom} : {}),
      },
      headerBackTitleVisible: false,
      headerTintColor:
        colorScheme === 'light' ? COLORS.white : COLORS.altoForDark,
      headerStyle: {
        backgroundColor:
          colorScheme === 'light'
            ? COLORS.light.background.primary
            : COLORS.dark.background.primary,
      },
      headerShadowVisible: false,
      headerBackVisible: false,

      headerLeft: props => {
        return props.canGoBack ? (
          <HeaderBackButton
            testID={'backButton'}
            onPress={() => navigation.goBack()}
          />
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
