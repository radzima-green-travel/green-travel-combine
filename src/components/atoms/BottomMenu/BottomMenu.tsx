import Animated, {SharedValue} from 'react-native-reanimated';
import {themeStyles} from './styles';
import {Text, View} from 'react-native';
import {useThemeStyles} from 'core/hooks';

import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

import React, {
  forwardRef,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useRef,
  useMemo,
  memo,
  useState,
} from 'react';
import {AnimatedCircleButton} from 'molecules/AnimatedCircleButton';
import {composeTestID} from 'core/helpers';
import {uniqueId} from 'lodash';

interface IProps {
  onHideEnd?: () => void;
  onHideStart?: () => void;
  onOpenEnd?: () => void;
  onOpenStart?: () => void;
  menuHeight?: number;
  animatedPosition?: Animated.SharedValue<number>;
  animatedIndex?: SharedValue<number>;
  showDragIndicator?: boolean;
  isPanDownEnabled?: boolean;
  withBackdrop?: boolean;
  header?: {
    title?: string;
    subtitle?: string;
    onBackPress?: () => void;
    onClosePress?: () => void;
    closeButtonVisible?: boolean;
  };
  testID: string;
  initialIndex?: number;
  bottomInset?: number;
  onBackdropPress?: () => void;
  adjustIOSKeyboardFrameDrops?: boolean;
}

export interface IBottomMenuRef {
  show: () => void;
  hide: () => void;
  isOpened: () => boolean;
  isOpening: () => boolean;
  isClosed: () => boolean;
}

export const BottomMenu = memo(
  forwardRef<IBottomMenuRef, PropsWithChildren<IProps>>(
    (
      {
        children,
        onHideEnd,
        onHideStart,
        menuHeight,
        animatedPosition,
        showDragIndicator = true,
        isPanDownEnabled = true,
        withBackdrop = false,
        header,
        testID,
        initialIndex = -1,
        bottomInset,
        onBackdropPress,
        animatedIndex,
        onOpenEnd,
        onOpenStart,
        adjustIOSKeyboardFrameDrops,
      },
      ref,
    ) => {
      const styles = useThemeStyles(themeStyles);
      const isOpened = useRef(false);
      const isOpening = useRef(false);
      const bottomSheetRef = useRef<BottomSheet>(null);

      const snapPoints = useMemo(() => [menuHeight], [menuHeight]);

      const show = useCallback(() => {
        bottomSheetRef.current?.expand();
      }, []);

      const hide = useCallback(() => {
        bottomSheetRef.current?.close();
      }, []);

      useImperativeHandle(ref, () => ({
        show: show,
        hide: hide,
        isOpened: () => {
          return isOpened.current;
        },
        isOpening: () => {
          return isOpening.current;
        },
        isClosed: () => {
          return !isOpening.current && !isOpened.current;
        },
      }));

      const [key, setKey] = useState(() => uniqueId());

      const onChange = useCallback(
        (index: number) => {
          isOpened.current = index === 0;

          if (index === 0) {
            onOpenEnd?.();
          }

          if (index === -1) {
            onHideEnd?.();
            setKey(uniqueId());
          }
        },
        [onHideEnd, onOpenEnd],
      );

      const onAnimate = useCallback(
        (fromIndex: number) => {
          if (fromIndex === 0) {
            onHideStart?.();
          }

          if (fromIndex === -1) {
            onOpenStart?.();
          }

          isOpening.current = fromIndex === -1;
        },
        [onHideStart, onOpenStart],
      );

      const renderBackdrop = useCallback(
        props => {
          return (
            <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
              onPress={onBackdropPress ?? undefined}
              adjustIOSKeyboardFrameDrops={adjustIOSKeyboardFrameDrops}
            />
          );
        },
        [onBackdropPress, adjustIOSKeyboardFrameDrops],
      );

      const renderMenuHeader = () => {
        if (!header) {
          return null;
        }

        const {title, subtitle, onBackPress, onClosePress, closeButtonVisible} =
          header;

        const buttonsVisible =
          onBackPress || onClosePress || closeButtonVisible;
        return (
          <View>
            {buttonsVisible ? (
              <View style={styles.headerButtonsContainer}>
                {onBackPress ? (
                  <AnimatedCircleButton
                    icon={{
                      name: 'chevronMediumLeft',
                      testID: composeTestID(testID, 'backButtonIcon'),
                    }}
                    testID={composeTestID(testID, 'backButton')}
                    onPress={onBackPress}
                  />
                ) : (
                  <View />
                )}
                {closeButtonVisible || onClosePress ? (
                  <AnimatedCircleButton
                    icon={{
                      testID: composeTestID(testID, 'closeButtonIcon'),
                      name: 'close',
                    }}
                    testID={composeTestID(testID, 'closeButton')}
                    onPress={onClosePress || hide}
                  />
                ) : (
                  <View />
                )}
              </View>
            ) : null}
            {title ? (
              <View style={styles.headerTextContainer}>
                {<Text style={styles.headerTitle}>{title}</Text>}
                {subtitle ? (
                  <Text style={styles.headerSubtitle}>{subtitle}</Text>
                ) : null}
              </View>
            ) : null}
          </View>
        );
      };

      if (menuHeight) {
        return (
          <BottomSheet
            backdropComponent={withBackdrop ? renderBackdrop : undefined}
            handleComponent={showDragIndicator ? undefined : null}
            ref={bottomSheetRef}
            handleStyle={styles.handleStyles}
            backgroundStyle={styles.bgStyle}
            handleIndicatorStyle={styles.touchIndicator}
            index={-1}
            snapPoints={snapPoints as [number]}
            enablePanDownToClose={isPanDownEnabled}
            onAnimate={onAnimate}
            accessible={false}
            onChange={onChange}>
            <>
              {renderMenuHeader()}
              {children}
            </>
          </BottomSheet>
        );
      }

      return (
        <BottomSheet
          backdropComponent={withBackdrop ? renderBackdrop : undefined}
          handleComponent={showDragIndicator ? undefined : null}
          animatedPosition={animatedPosition}
          ref={bottomSheetRef}
          handleStyle={styles.handleStyles}
          backgroundStyle={styles.bgStyle}
          handleIndicatorStyle={styles.touchIndicator}
          animatedIndex={animatedIndex}
          index={initialIndex}
          enableDynamicSizing
          enablePanDownToClose={isPanDownEnabled}
          onAnimate={onAnimate}
          bottomInset={bottomInset}
          accessible={false}
          onChange={onChange}>
          <BottomSheetView key={key}>
            <>
              {renderMenuHeader()}
              {children}
            </>
          </BottomSheetView>
        </BottomSheet>
      );
    },
  ),
);
