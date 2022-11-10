import {useCallback} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import RNBootSplash from 'react-native-bootsplash';

export const useSplash = () => {
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

  return {
    animateIOS,
    animateAndroid,
    containerAnimatedStyle,
    imageAnimatedStyle,
    textAnimatedStyle,
  };
};
