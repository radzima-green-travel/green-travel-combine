import Animated from 'react-native-reanimated';
import {themeStyles} from './styles';
import {Keyboard} from 'react-native';
import {useThemeStyles} from 'core/hooks';

import BottomSheet, { BottomSheetModal,

  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import { Portal } from '@gorhom/portal'

import React, {
  forwardRef,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useRef,
  useMemo,
  memo,
} from 'react';

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

export const BottomMenu = memo(forwardRef<IBottomMenuRef, PropsWithChildren<IProps>>(
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
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => [menuHeight], [menuHeight]);

    const show = useCallback(() => {
      bottomSheetRef.current?.expand();
    }, []);

    const hide = useCallback(() => {
      bottomSheetRef.current?.close();
    }, [])

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
        
        if(index  === -1) {
          onHideEnd?.()
        } 
      },
      [onHideEnd],
    );

    const onAnimate = useCallback((fromIndex: number) => {
      if (fromIndex === 0) {
        onHideStart?.()
        Keyboard.dismiss();
      }
    }, [onHideStart]);

    if (menuHeight ) {
      return (
        <Portal>
          <BottomSheet
            handleComponent={showDragIndicator ? undefined : null}
            ref={bottomSheetRef}
            handleStyle={styles.handleStyles}
            backgroundStyle={styles.bgStyle}
            handleIndicatorStyle={styles.touchIndicator}
            index={-1}     
            snapPoints={snapPoints as [number]}
            enablePanDownToClose
            onAnimate={onAnimate}
            onChange={onChange}>
            {children}
          </BottomSheet>
      </Portal>

      );
    }

    return (
      <Portal>
        <BottomSheet
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
        </BottomSheet>
      </Portal>

    );
  },
))
