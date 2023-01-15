import React from 'react';
import {ColorSchemeName, TouchableOpacity} from 'react-native';
import {Icon, HeaderTitle} from 'atoms';
import {FONTS_STYLES} from 'assets/fonts';
import {COLORS} from 'assets';
import {Header} from '@react-navigation/elements';
import {useColorScheme} from 'core/hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {SCREEN_WIDTH} from 'services/PlatformService';

export interface IOptions {
  colorScheme: ColorSchemeName;
}

export function useScreenOptions({
  withBottomInset = false,
}: {withBottomInset?: boolean} = {}): NativeStackNavigationOptions {
  const colorScheme = useColorScheme();
  const {top, bottom} = useSafeAreaInsets();

  return {
    contentStyle: {
      backgroundColor:
        colorScheme === 'light' ? COLORS.white : COLORS.background,
      ...(withBottomInset ? {marginBottom: bottom} : {}),
    },
    header: ({navigation, route, options, back}) => {
      const {title, ...restOptions} = options;
      const titleText = title || route.name;
      return (
        <Header
          headerBackTitleVisible={false}
          headerStatusBarHeight={top}
          headerTintColor={
            colorScheme === 'light' ? COLORS.white : COLORS.altoForDark
          }
          headerTitleAlign="center"
          headerLeft={() => {
            return back ? (
              <TouchableOpacity
                hitSlop={{left: 15, right: 15, bottom: 15, top: 15}}
                activeOpacity={0.8}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon name="chevron" color="white" size={24} />
              </TouchableOpacity>
            ) : undefined;
          }}
          modal={false}
          headerStyle={{
            backgroundColor:
              colorScheme === 'light' ? COLORS.apple : COLORS.background,
            shadowOpacity: 0,
            elevation: 0,
          }}
          headerTitleStyle={{
            ...FONTS_STYLES.semibold16,
          }}
          headerTitleContainerStyle={{maxWidth: SCREEN_WIDTH * 0.7}}
          headerLeftContainerStyle={{paddingLeft: 16}}
          headerRightContainerStyle={{paddingRight: 16}}
          headerTitle={() => <HeaderTitle title={titleText} />}
          {...restOptions}
        />
      );
    },
  };
}
