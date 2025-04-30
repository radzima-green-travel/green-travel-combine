import React from 'react';
import {ColorSchemeName, TouchableOpacity} from 'react-native';
import {Icon, HeaderTitle} from 'atoms';
import {COLORS} from 'assets';
import {useColorScheme} from 'core/hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {getPlatformsTestID} from 'core/helpers';

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
        backgroundColor: COLORS[colorScheme].background.primary,
        ...(withBottomInset ? {paddingBottom: bottom} : {}),
      },
      headerBackTitleVisible: false,
      headerTintColor:
        colorScheme === 'light' ? COLORS.white : COLORS.altoForDark,
      headerStyle: {
        backgroundColor: COLORS[colorScheme].background.navBar,
      },
      headerShadowVisible: false,
      headerBackVisible: false,
      headerTitleAlign: 'center',
      headerLeft: props => {
        return props.canGoBack ? (
          <TouchableOpacity
            {...getPlatformsTestID('backButton')}
            hitSlop={15}
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
