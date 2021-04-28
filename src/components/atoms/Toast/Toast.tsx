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
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const Toast = memo<Props>(
  forwardRef<toastRef, Props>(({children}, ref) => {
    const {top} = useSafeAreaInsets();
    const toastHeight = top + TOAST_HEIGHT;
    const [translateY] = useState(() => new Animated.Value(-toastHeight));
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
      animateTanslateYTo(-toastHeight);
    }, [animateTanslateYTo, toastHeight]);

    const hideToastAfterDelay = useCallback(() => {
      // @ts-ignore FIXME: timeout could be null
      timeout.current = setTimeout(hide, 1000);
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
      <Animated.View
        style={[
          styles.container,
          {height: toastHeight, paddingTop: top, transform: [{translateY}]},
        ]}>
        {children}
      </Animated.View>
    );
  }),
);
