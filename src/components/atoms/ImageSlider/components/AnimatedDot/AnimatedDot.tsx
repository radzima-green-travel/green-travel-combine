import React, {useCallback, useLayoutEffect, useState, memo} from 'react';
import {Animated} from 'react-native';
import {styles} from './styles';
interface IProps {
  isActive: boolean;
  index: number;
  pivotIndex: number;
  animated: boolean;
}

export const AnimatedDot = memo(
  ({isActive, index, pivotIndex, animated}: IProps) => {
    const getCurrentScale = useCallback(() => {
      if (!animated) {
        return 1;
      }

      if (index < pivotIndex - 2 || index > pivotIndex + 4) {
        return 0;
      } else if (index === pivotIndex - 2 || index === pivotIndex + 4) {
        return 0.5;
      } else if (index === pivotIndex - 1 || index === pivotIndex + 3) {
        return 0.75;
      } else {
        return 1;
      }
    }, [pivotIndex, index, animated]);

    const [animatedValue] = useState(
      () => new Animated.Value(getCurrentScale()),
    );
    const animate = useCallback(
      (toValue) => {
        Animated.timing(animatedValue, {
          toValue,
          duration: 200,
          useNativeDriver: true,
        }).start();
      },
      [animatedValue],
    );

    useLayoutEffect(() => {
      if (animated) {
        animate(getCurrentScale());
      }
    }, [getCurrentScale, animate, animated]);

    return (
      <Animated.View
        style={[
          styles.container,
          isActive && styles.active,
          {transform: [{scale: animatedValue}]},
        ]}
      />
    );
  },
);
