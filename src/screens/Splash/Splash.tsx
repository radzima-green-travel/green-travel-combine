import React, { useCallback } from 'react';
import { View, useWindowDimensions } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';
import { themeStyles } from './styles';
import { useColorScheme, useThemeStyles } from 'core/hooks';
import { isAndroid } from 'services/PlatformService';
import { setStatusBarHidden } from 'expo-status-bar';

interface IProps {
  onAnimationEnd?: () => void;
  onFadeStart?: () => void;
}

const logoSrc = require('../../assets/bootsplash/bootsplash_logo.png');
const darkLogoSrc = require('../../assets/bootsplash/bootsplash_logo_dark.png');

const splashImageWidth = 1284;
const logoWidthOnSplash = 192;
const logoWidthPercentage = logoWidthOnSplash / splashImageWidth;

export const Splash = ({ onAnimationEnd, onFadeStart }: IProps) => {
  const opacity = useSharedValue(1);
  const animatedValue = useSharedValue(0);
  const theme = useColorScheme();
  const styles = useThemeStyles(themeStyles);

  const { width } = useWindowDimensions();

  const logoDimensions = Math.round(width * logoWidthPercentage);
  const imageSource = theme === 'light' ? logoSrc : darkLogoSrc;

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: logoDimensions,
      height: logoDimensions,
      transform: [
        { translateX: interpolate(animatedValue.value, [0, 1], [0, -90]) },
      ],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
      transform: [
        { scale: animatedValue.value },
        {
          translateX: interpolate(animatedValue.value, [0, 1], [0, 35]),
        },
      ],
    };
  });

  const animateSplash = useCallback(() => {
    animatedValue.value = withTiming(
      1,
      {
        duration: 400,
        easing: Easing.out(Easing.ease),
      },
      () => {
        if (onFadeStart) {
          runOnJS(onFadeStart)();
        }
        opacity.value = withTiming(
          0,
          {
            duration: 300,
            easing: Easing.out(Easing.ease),
          },
          () => {
            if (onAnimationEnd) {
              runOnJS(onAnimationEnd)();
            }
          },
        );
      },
    );
  }, [animatedValue, onAnimationEnd, onFadeStart, opacity]);

  const onImageLoad = useCallback(() => {
    // Timeout is needed to prevent onLoad flickering on Android
    setTimeout(() => {
      SplashScreen.hideAsync().finally(() => {
        isAndroid && setStatusBarHidden(false, 'fade');
        animateSplash();
      });
    }, 200);
  }, [animateSplash]);

  return (
    <Animated.View style={[containerAnimatedStyle, styles.container]}>
      <Animated.Image
        onLoad={onImageLoad}
        source={imageSource}
        style={imageAnimatedStyle}
      />

      <View style={styles.textContainer}>
        <Animated.Text style={[textAnimatedStyle, styles.text]}>
          Radzima
        </Animated.Text>
      </View>
    </Animated.View>
  );
};
