import React, {useCallback, useEffect} from 'react';

import {View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import RNBootSplash from 'react-native-bootsplash';
import {isIOS} from 'services/PlatformService';
import {styles} from './styles';

interface IProps {
  onAnimationEnd?: () => void;
  onFadeStart?: () => void;
}

export const Splash = ({onAnimationEnd, onFadeStart}: IProps) => {
  const opacity = useSharedValue(1);
  const animatedValue = useSharedValue(0);

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

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const animateIOS = useCallback(() => {
    setTimeout(() => {
      RNBootSplash.hide().then(() => {
        animatedValue.value = withTiming(1, {
          duration: 300,
          easing: Easing.out(Easing.ease),
        });
        if (onAnimationEnd) {
          onAnimationEnd();
        }
      });
    }, 10);
  }, [animatedValue, onAnimationEnd]);

  const animateAndroid = useCallback(() => {
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
  }, [animatedValue, onAnimationEnd, onFadeStart, opacity]);

  useEffect(() => {
    if (isIOS) {
      animateIOS();
    } else {
      animateAndroid();
    }
  }, [animateAndroid, animateIOS]);

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
