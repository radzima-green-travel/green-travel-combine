import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getDefaultHeaderHeight} from '@react-navigation/elements';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from 'services/PlatformService';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';

import {AnimatedCircleButton} from 'molecules';
import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {TestIDs} from 'core/types';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface IProps {
  objectName: string;
  animatedValue: SharedValue<number>;
  pivotHegightToAnimate: number;
}

export const ObjectDetailsHeader = memo(
  ({objectName, animatedValue, pivotHegightToAnimate}: IProps) => {
    const navigation = useNavigation();
    const styles = useThemeStyles(themeStyles);
    const {top} = useSafeAreaInsets();

    const height = getDefaultHeaderHeight(
      {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
      },
      false,
      top,
    );

    const hideStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          animatedValue.value,
          [0, pivotHegightToAnimate - 80, pivotHegightToAnimate],
          [0, 0, 1],
        ),
      };
    });

    const buttonStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          animatedValue.value,
          [0, pivotHegightToAnimate - 80, pivotHegightToAnimate],
          [1, 1, 0],
        ),
      };
    });

    return (
      <View pointerEvents="box-none" style={[styles.container, {height}]}>
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, hideStyle]}>
          <View style={styles.headerBG} />
        </Animated.View>
        <View style={styles.content} pointerEvents="box-none">
          <AnimatedCircleButton
            icon={{
              name: 'chevronMediumLeft',
            }}
            testID={TestIDs.HeaderBackButton}
            style={buttonStyle}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}
          />
          <View style={styles.titleContainer}>
            <Animated.Text numberOfLines={1} style={[styles.title, hideStyle]}>
              {objectName}
            </Animated.Text>
          </View>
          <View style={styles.rightPlaceholder} />
        </View>
      </View>
    );
  },
);
