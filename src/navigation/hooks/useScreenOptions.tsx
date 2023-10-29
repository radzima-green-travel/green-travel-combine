import React from 'react';
import {ColorSchemeName, TouchableOpacity} from 'react-native';
import {Icon, HeaderTitle} from 'atoms';
import {COLORS} from 'assets';
import {useColorScheme} from 'core/hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

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
            ? COLORS.light.background.navBar
            : COLORS.dark.background.navBar,
      },
      headerShadowVisible: false,
      headerBackVisible: false,
      headerTitleAlign: 'center',
      headerLeft: props => {
        return props.canGoBack ? (
          <TouchableOpacity
            hitSlop={{left: 15, right: 15, bottom: 15, top: 15}}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron" color="white" size={20} />
          </TouchableOpacity>
        ) : null;
      },
      headerTitle: props => <HeaderTitle title={props.children} />,
      ...customOptions,
    } as NativeStackNavigationOptions);
}
