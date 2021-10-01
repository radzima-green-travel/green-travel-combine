import React, {
  forwardRef,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useRef,
  useMemo,
} from 'react';
import {
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Animated, { useAnimatedReaction} from 'react-native-reanimated';
import {themeStyles} from './styles';
import {Keyboard} from 'react-native';
import {useThemeStyles} from 'core/hooks';

interface IProps {
  onHideEnd?: () => void;
  onHideStart?: () => void
  menuHeight?: number;
  animatedPosition?: Animated.SharedValue<number>;
  showDragIndicator?: boolean;
}

export interface IBottomMenuRef {
  show: () => void;
  hide: () => void;
  isOpened: () => boolean;
}

export const BottomMenu = forwardRef<IBottomMenuRef, PropsWithChildren<IProps>>(
  (
    {
      children,
      onHideEnd,
      onHideStart,
      menuHeight,
      animatedPosition,
      showDragIndicator = true,
    },
    ref,
  ) => {
    const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);

    const {
      animatedHandleHeight,
      animatedSnapPoints,
      animatedContentHeight,
      handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

    const styles = useThemeStyles(themeStyles);
    const isOpened = useRef(false);
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => [menuHeight], [menuHeight]);

    const show = () => {
      bottomSheetRef.current?.present();
    };

    const hide = () => {
      bottomSheetRef.current?.dismiss();
    };

    useImperativeHandle(ref, () => ({
      show: show,
      hide: hide,
      isOpened: () => {
        return isOpened.current;
      },
    }));

    const onChange = useCallback(
      (index: number) => {
        isOpened.current = index === 0;
        if (index === -1) {
          onHideEnd?.();
        }
      },
      [onHideEnd],
    );

    const onAnimate = useCallback((fromIndex: number) => {
      if (fromIndex === 0) {
        onHideStart?.()
        Keyboard.dismiss();
      }
    }, []);

    if (menuHeight ) {
      return (
        <BottomSheetModal
          handleComponent={showDragIndicator ? undefined : null}
          ref={bottomSheetRef}
          handleStyle={styles.handleStyles}
          backgroundStyle={styles.bgStyle}
          handleIndicatorStyle={styles.touchIndicator}
          index={0}     
          snapPoints={snapPoints as [number]}
          enablePanDownToClose
          onAnimate={onAnimate}
          onChange={onChange}>
          {children}
        </BottomSheetModal>
      );
    }

    return (
      <BottomSheetModal
        handleComponent={showDragIndicator ? undefined : null}       
        animatedPosition={animatedPosition}
        ref={bottomSheetRef}
        handleStyle={styles.handleStyles}
        backgroundStyle={styles.bgStyle}
        handleIndicatorStyle={styles.touchIndicator}
        index={0}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        enablePanDownToClose
        onAnimate={onAnimate}
        onChange={onChange}>
        <BottomSheetView onLayout={handleContentLayout}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);
