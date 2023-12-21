import {useCallback, useRef, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

export const useMarkAsVisitedButtonAnimation = () => {
  const animationRef = useRef<LottieView>(null);
  const animatedValue = useSharedValue(1);
  const [labelWidth, setLabelWidth] = useState(0);

  const onAddVisitedObjectSuccess = useCallback(() => {
    animatedValue.value = withTiming(1, {
      duration: 300,
    });

    animationRef.current?.play();
  }, [animatedValue]);

  const onButtonLabelLayout = useCallback(
    (event: LayoutChangeEvent) => setLabelWidth(event.nativeEvent.layout.width),
    [],
  );

  const iconContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            animatedValue.value,
            [0, 1],
            [0, -labelWidth / 2 - 8],
          ),
        },
      ],
    };
  });

  const labelAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
    };
  });

  return {
    animatedValue,
    animationRef,
    onButtonLabelLayout,
    iconContainerAnimatedStyle,
    labelAnimatedStyle,
    onAddVisitedObjectSuccess,
  };
};
