import React from 'react';

import {StyleSheet, ColorSchemeName, View} from 'react-native';
import {StackNavigationOptions} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'atoms';
import {FONTS_STYLES} from 'assets/fonts';
import {isAndroid} from 'services/PlatformService';
import {COLORS} from 'assets';

export interface IOptions {
  colorScheme: ColorSchemeName;
}

export const getAppHeaderOptions = ({
  colorScheme,
}: IOptions): StackNavigationOptions => ({
  headerBackTitleVisible: false,
  headerTintColor: colorScheme === 'light' ? COLORS.white : COLORS.altoForDark,
  headerTitleAlign: 'center',
  cardStyle: {
    backgroundColor: colorScheme === 'light' ? COLORS.white : COLORS.background,
  },
  headerBackImage: () => (
    <View style={{paddingVertical: 5, paddingHorizontal: 8}}>
      <Icon name="chevron" color="white" size={24} />
    </View>
  ),
  ...(colorScheme === 'light'
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
      }),

  headerTitleStyle: {
    ...FONTS_STYLES.semibold16,
  },
  headerTitleContainerStyle: {
    marginHorizontal: isAndroid ? 45 : 50,
  },
  headerLeftContainerStyle: {paddingLeft: isAndroid ? 0 : 16},
  headerRightContainerStyle: {paddingRight: 16},
});
