import React, {
  memo,
  useState,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {noop} from 'lodash';
import {Animated} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {themeStyles, TOAST_HEIGHT} from './styles';
import {Props, toastRef} from './types';

export const Toast = memo<Props>(
  forwardRef<toastRef, Props>(({children}, ref) => {
    const [translateY] = useState(() => new Animated.Value(-TOAST_HEIGHT));
    const isVisible = useRef(false);
    const styles = useThemeStyles(themeStyles);
    const timeout = useRef(null);

    const animateTanslateYTo = useCallback(
      (toValue, onAnimationEnd = noop) => {
        Animated.timing(translateY, {
          toValue,
          duration: 200,
          useNativeDriver: true,
        }).start(onAnimationEnd);
      },
      [translateY],
    );
    const hide = useCallback(() => {
      isVisible.current = false;
      animateTanslateYTo(-TOAST_HEIGHT);
    }, [animateTanslateYTo]);

    const hideToastAfterDelay = useCallback(() => {
      // @ts-ignore FIXME: timeout could be null
      timeout.current = setTimeout(hide, 3000);
    }, [hide]);

    const show = useCallback(() => {
      // @ts-ignore FIXME: timeout could be null
      clearTimeout(timeout.current);
      if (!isVisible.current) {
        isVisible.current = true;
        animateTanslateYTo(0, hideToastAfterDelay);
      } else {
        hideToastAfterDelay();
      }
    }, [animateTanslateYTo, hideToastAfterDelay]);

    useImperativeHandle(ref, () => ({
      show,
      hide,
    }));

    return (
      <Animated.View style={[styles.container, {transform: [{translateY}]}]}>
        {children}
      </Animated.View>
    );
  }),
);
