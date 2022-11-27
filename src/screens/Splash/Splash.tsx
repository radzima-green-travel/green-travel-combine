import React, {useCallback, useEffect} from 'react';

import {View} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {isIOS} from 'services/PlatformService';
import {
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import RNBootSplash from 'react-native-bootsplash';
import {styles} from './styles';

interface IProps {
  onAnimationEnd?: () => void;
  onFadeStart?: () => void;
}

export const Splash = ({onAnimationEnd, onFadeStart}: IProps) => {
  const opacity = useSharedValue(1);
  const animatedValue = useSharedValue(0);

  const animateIOS = useCallback(
    onAnimationEnd => {
      setTimeout(() => {
        RNBootSplash.hide().then(() => {
          animatedValue.value = withTiming(
            1,
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
        });
      }, 10);
    },
    [animatedValue],
  );

  const animateAndroid = useCallback(
    (onFadeStart, onAnimationEnd) => {
      setTimeout(() => {
        RNBootSplash.hide().then(() => {
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
        });
      }, 300);
    },
    [animatedValue, opacity],
  );

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: interpolate(animatedValue.value, [0, 1], [0, -90])},
      ],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
      transform: [
        {scale: animatedValue.value},
        {
          translateX: interpolate(animatedValue.value, [0, 1], [0, 35]),
        },
      ],
    };
  });

  useEffect(() => {
    if (isIOS) {
      animateIOS(onAnimationEnd);
    } else {
      animateAndroid(onFadeStart, onAnimationEnd);
    }
  }, [animateAndroid, animateIOS, onAnimationEnd, onFadeStart]);

  return (
    <Animated.View style={[containerAnimatedStyle, styles.container]}>
      <Animated.Image
        style={imageAnimatedStyle}
        source={require('./img/icon.png')}
      />

      <View style={styles.textContainer}>
        <Animated.Text style={[textAnimatedStyle, styles.text]}>
          Radzima
        </Animated.Text>
      </View>
    </Animated.View>
  );
};
