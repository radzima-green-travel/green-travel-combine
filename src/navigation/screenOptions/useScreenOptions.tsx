import React from 'react';

import {StyleSheet, ColorSchemeName, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'atoms';
import {FONTS_STYLES} from 'assets/fonts';
import {COLORS} from 'assets';
import {Header} from '@react-navigation/elements';
import {useColorScheme} from 'core/hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

export interface IOptions {
  colorScheme: ColorSchemeName;
}

export function useScreenOptions(): NativeStackNavigationOptions {
  const colorScheme = useColorScheme();
  const {top} = useSafeAreaInsets();

  return {
    contentStyle: {
      backgroundColor:
        colorScheme === 'light' ? COLORS.white : COLORS.background,
    },
    header: ({back, navigation, route, options}) => {
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
                  if (navigation.canGoBack()) {
                    navigation.goBack();
                  }
                }}>
                <Icon name="chevron" color="white" size={24} />
              </TouchableOpacity>
            ) : undefined;
          }}
          modal={false}
          {...(colorScheme === 'light'
            ? {
                headerBackground: () => (
                  <LinearGradient
                    start={{x: 0.0, y: 0.0}}
                    end={{x: 1.0, y: 0.0}}
                    colors={['#50A021', '#35C7A4']}
                    style={StyleSheet.absoluteFill}
                  />
                ),
              }
            : {
                headerStyle: {
                  backgroundColor: COLORS.background,
                  shadowOpacity: 0,
                  elevation: 0,
                },
              })}
          headerTitleStyle={{
            ...FONTS_STYLES.semibold16,
          }}
          headerTitleContainerStyle={{maxWidth: undefined}}
          headerLeftContainerStyle={{paddingLeft: 16}}
          headerRightContainerStyle={{paddingRight: 16}}
          title={titleText}
          {...restOptions}
        />
      );
    },
  };
}
