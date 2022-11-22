import {useCallback} from 'react';
import {
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import RNBootSplash from 'react-native-bootsplash';

export const useSplash = () => {
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

  return {
    opacity,
    animatedValue,
    animateIOS,
    animateAndroid,
  };
};
