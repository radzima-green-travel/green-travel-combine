import React, {
  forwardRef,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useRef,
  useMemo,
} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';
import {styles} from './styles';
import {Keyboard} from 'react-native';

interface IProps {
  onHideEnd?: () => void;
  menuHeight: number;
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
      menuHeight,
      animatedPosition,
      showDragIndicator = true,
    },
    ref,
  ) => {
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
        isOpened.current = index === -1;

        if (index === -1) {
          onHideEnd?.();
        }
      },
      [onHideEnd],
    );

    const onAnimate = useCallback((fromIndex: number) => {
      if (fromIndex === 0) {
        Keyboard.dismiss();
      }
    }, []);

    return (
      <BottomSheetModal
        handleComponent={showDragIndicator ? undefined : null}
        animatedIndex={animatedPosition}
        ref={bottomSheetRef}
        handleIndicatorStyle={styles.touchIndicator}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        onAnimate={onAnimate}
        onChange={onChange}>
        {children}
      </BottomSheetModal>
    );
  },
);
