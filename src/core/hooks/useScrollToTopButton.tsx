import {Button, Icon} from 'components/atoms';
import React, {useCallback, useMemo} from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export const useScrollToTopButton = () => {
  const buttonAnimationValue = useSharedValue(0);

  const animatedListRef = useAnimatedRef<Animated.FlatList<any>>();
  const listHeight = useSharedValue(0);
  const listContentHeight = useSharedValue(0);
  const scrollOffset = useSharedValue(0);

  const listScrollHandler = useAnimatedScrollHandler(event => {
    scrollOffset.value = event.contentOffset.y;
  });

  // Doesn't let the button appear on iOS overscroll bounce
  const safeScrollOffset = useDerivedValue(() =>
    Math.min(scrollOffset.value, listContentHeight.value - listHeight.value),
  );

  useAnimatedReaction(
    () => safeScrollOffset.value > listHeight.value * 0.5,
    isBeyondScrollThreshold => {
      buttonAnimationValue.value = withSpring(isBeyondScrollThreshold ? 1 : 0, {
        stiffness: 80,
        overshootClamping: false,
        velocity: 1.8,
      });
    },
  );

  const buttonContainerStyle = useAnimatedStyle(() => ({
    ...styles.container,
    opacity: interpolate(buttonAnimationValue.value, [0, 0.05, 1], [0, 1, 1]),
    transform: [
      {
        scale: interpolate(
          buttonAnimationValue.value,
          [0, 0.04, 0.05, 1],
          [0, 0, 0.25, 1],
        ),
      },
      {
        translateY: interpolate(buttonAnimationValue.value, [0, 1], [200, 0]),
      },
    ],
  }));

  const buttonContainerProps = useAnimatedProps<ViewProps>(() => {
    return {
      pointerEvents: buttonAnimationValue.value < 1 ? 'none' : 'auto',
    };
  });

  const ScrollToTopButton = useMemo(
    () =>
      ({style, buttonStyle}: ScrollToTopButtonProps) => (
        <Animated.View
          style={StyleSheet.compose(buttonContainerStyle, style)}
          animatedProps={buttonContainerProps}>
          <Button
            testID="scrollToTopButton"
            renderIcon={textStyle => (
              <Icon name="arrowUp" size={24} style={textStyle} />
            )}
            isIconOnlyButton
            elevated
            theme="secondary"
            style={StyleSheet.compose(styles.button, buttonStyle)}
            onPress={() => {
              animatedListRef.current?.scrollToOffset({
                offset: 0,
                animated: true,
              });
            }}
          />
        </Animated.View>
      ),
    [animatedListRef, buttonContainerProps, buttonContainerStyle],
  );

  const listLayoutHandler = useCallback(
    (event: LayoutChangeEvent) => {
      listHeight.value = event.nativeEvent.layout.height;
    },
    [listHeight],
  );

  const listContentSizeChangeHandler = useCallback(
    (_, height: number) => {
      listContentHeight.value = height;
    },
    [listContentHeight],
  );

  return {
    ScrollToTopButton,
    listRef: animatedListRef,
    listScrollHandler,
    listLayoutHandler,
    listContentSizeChangeHandler,
  };
};

interface ScrollToTopButtonProps {
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    bottom: 16,
    right: 16,
  },
  button: {
    borderWidth: 0,
  },
});
