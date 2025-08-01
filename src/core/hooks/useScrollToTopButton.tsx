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
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export const useScrollToTopButton = () => {
  const buttonAnimationValue = useSharedValue(0);

  const animatedListRef = useAnimatedRef<Animated.FlatList<any>>();
  const listHeight = useSharedValue(0);
  const scrollOffset = useScrollViewOffset(animatedListRef as any);

  useAnimatedReaction(
    () => scrollOffset.value > listHeight.value * 0.5,
    isBeyondScrollThreshold => {
      buttonAnimationValue.value = withSpring(isBeyondScrollThreshold ? 1 : 0, {
        stiffness: 150,
        overshootClamping: false,
        velocity: 10,
      });
    },
  );

  const buttonContainerStyle = useAnimatedStyle(() => ({
    ...styles.container,
    opacity: buttonAnimationValue.value,
    transform: [
      {
        scale: interpolate(buttonAnimationValue.value, [0, 1], [0.85, 1]),
      },
      {
        translateY: interpolate(buttonAnimationValue.value, [0, 1], [10, 0]),
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
            withShadow
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

  const onListLayout = useCallback(
    (event: LayoutChangeEvent) => {
      listHeight.value = event.nativeEvent.layout.height;
    },
    [listHeight],
  );

  return {
    ScrollToTopButton,
    listRef: animatedListRef,
    onListLayout,
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
