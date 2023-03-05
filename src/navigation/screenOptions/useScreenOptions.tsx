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
          colorScheme === 'light' ? COLORS.white : COLORS.background,
        ...(withBottomInset ? {paddingBottom: bottom} : {}),
      },
      headerBackTitleVisible: false,
      headerTintColor:
        colorScheme === 'light' ? COLORS.white : COLORS.altoForDark,
      headerStyle: {
        backgroundColor:
          colorScheme === 'light' ? COLORS.apple : COLORS.background,
      },
      headerShadowVisible: false,
      headerBackVisible: false,
      headerTitleAlign: 'center',
      headerLeft: props =>
        props.canGoBack ? (
          <TouchableOpacity
            hitSlop={{left: 15, right: 15, bottom: 15, top: 15}}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron" color="white" size={24} />
          </TouchableOpacity>
        ) : null,
      headerTitle: props => <HeaderTitle title={props.children} />,
      ...customOptions,
    } as NativeStackNavigationOptions);
}
