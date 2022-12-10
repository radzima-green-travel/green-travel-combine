import React, {
  PropsWithChildren,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
  memo,
  useEffect,
} from 'react';

import {useWindowDimensions, LayoutChangeEvent} from 'react-native';

import Animated, {
  useAnimatedStyle,
  interpolate,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import {themeStyles} from './styles';
import {useStaticCallback, useThemeStyles} from 'core/hooks';

export interface SnackBarContainerProps {
  isOnTop?: boolean;
  testID?: string;
  timeoutMs?: number;
}

export interface SnackBarContainerRef {
  show: () => void;
  hide: (hideWithoutCallBack?: boolean) => void;
}

export const SnackBarContainer = memo(
  forwardRef<SnackBarContainerRef, PropsWithChildren<SnackBarContainerProps>>(
    ({children, testID, isOnTop = false, timeoutMs = 3000}, ref) => {
      const {height: SCREEN_HEIGHT} = useWindowDimensions();
      const styles = useThemeStyles(themeStyles);
      const animatedValue = useSharedValue(0);
      const [toastHeight, setToastHeight] = useState<number | null>(null);
      const timeout = useRef<null | ReturnType<typeof setTimeout>>(null);

      const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

      const calculateToastHeight = ({nativeEvent}: LayoutChangeEvent) => {
        if (timer.current) {
          clearTimeout(timer.current);
        }
        const height = nativeEvent.layout.height;

        timer.current = setTimeout(() => {
          setToastHeight(height);
        }, 10);
      };

      const [visible, setVisible] = useState(false);

      const animate = useCallback(
        (toValue: 1 | 0, onAnimationEnd: () => void) => {
          animatedValue.value = withTiming(
            toValue,
            {
              duration: 300,
              easing: Easing.inOut(Easing.exp),
            },
            isFinished => {
              if (isFinished) {
                runOnJS(onAnimationEnd)();
              }
            },
          );
        },
        [animatedValue],
      );

      const clearTimeOut = useCallback(() => {
        if (timeout.current) {
          clearTimeout(timeout.current);
          timeout.current = null;
        }
      }, []);

      const hide = useStaticCallback(() => {
        clearTimeOut();

        animate(0, () => {
          setToastHeight(null);
          setVisible(false);
        });
      }, [animate, clearTimeOut]);

      const hideAfterTimeout = useCallback(() => {
        timeout.current = setTimeout(() => hide(), timeoutMs);
      }, [hide, timeoutMs]);

      const show = useCallback(() => {
        clearTimeOut();

        if (!visible) {
          setVisible(true);
        } else {
          hideAfterTimeout();
        }
      }, [clearTimeOut, hideAfterTimeout, visible]);

      useEffect(() => {
        if (visible && toastHeight) {
          animate(1, hideAfterTimeout);
        }
      }, [animate, hideAfterTimeout, toastHeight, visible]);

      useEffect(() => clearTimeOut, [clearTimeOut]);

      useImperativeHandle(ref, () => ({
        show,
        hide,
      }));

      const animatedStyles = useAnimatedStyle(() => {
        return {
          transform: [
            {
              translateY: interpolate(
                animatedValue.value,
                [0, 1],
                [(isOnTop ? -1 : 1) * (toastHeight || SCREEN_HEIGHT), 0],
              ),
            },
          ],
        };
      });

      return (
        <Animated.View
          testID={`bottom_menu_${testID}`}
          onLayout={calculateToastHeight}
          style={[
            isOnTop ? styles.topContainer : styles.bottomContainer,
            animatedStyles,
          ]}>
          {visible ? children : null}
        </Animated.View>
      );
    },
  ),
);
