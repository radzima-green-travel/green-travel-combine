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
  forwardRef<toastRef, Props>(({children, isOnTop, safeArea = false}, ref) => {
    const {top: topOffset} = useSafeAreaInsets();
    const top = safeArea ? topOffset : 0;
    const toastHeight = (isOnTop ? top : 0) + TOAST_HEIGHT;
    const [translateY] = useState(
      () => new Animated.Value(isOnTop ? -toastHeight : toastHeight),
    );
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
      animateTanslateYTo(isOnTop ? -toastHeight : toastHeight);
    }, [animateTanslateYTo, isOnTop, toastHeight]);

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
          {height: toastHeight, transform: [{translateY}]},
          isOnTop && {paddingTop: top},
          isOnTop && styles.topContainer,
        ]}>
        {children}
      </Animated.View>
    );
  }),
);
