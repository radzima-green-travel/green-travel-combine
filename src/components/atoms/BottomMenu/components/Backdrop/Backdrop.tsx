import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface BackdropProps {
  animatedIndex: SharedValue<number>;
  onPress: () => void;
}

export const Backdrop = ({ animatedIndex, onPress }: BackdropProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 0.4],
      Extrapolate.CLAMP,
    ),
  }));

  const containerStyle = useMemo(
    () => [
      StyleSheet.absoluteFillObject,
      {
        backgroundColor: '#000000',
      },
      containerAnimatedStyle,
    ],
    [containerAnimatedStyle],
  );

  return (
    <Animated.View
      onStartShouldSetResponderCapture={() => {
        onPress();
        return false;
      }}
      style={containerStyle}
    />
  );
};
