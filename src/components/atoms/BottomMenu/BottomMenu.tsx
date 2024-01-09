import Animated from 'react-native-reanimated';
import {themeStyles} from './styles';
import {Text, View} from 'react-native';
import {useThemeStyles} from 'core/hooks';

import BottomSheet, {
  useBottomSheetDynamicSnapPoints,
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
} from 'react';
import {AnimatedCircleButton} from 'molecules';
import {composeTestID} from 'core/helpers';

interface IProps {
  onHideEnd?: () => void;
  onHideStart?: () => void;
  menuHeight?: number;
  animatedPosition?: Animated.SharedValue<number>;
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

      const onChange = useCallback(
        (index: number) => {
          isOpened.current = index === 0;

          if (index === -1) {
            onHideEnd?.();
          }
        },
        [onHideEnd],
      );

      const onAnimate = useCallback(
        (fromIndex: number) => {
          if (fromIndex === 0) {
            onHideStart?.();
          }

          isOpening.current = fromIndex === -1;
        },
        [onHideStart],
      );

      const renderBackdrop = useCallback(props => {
        return (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        );
      }, []);

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
            backdropComponent={withBackdrop ? renderBackdrop : null}
            handleComponent={showDragIndicator ? undefined : null}
            ref={bottomSheetRef}
            handleStyle={styles.handleStyles}
            backgroundStyle={styles.bgStyle}
            handleIndicatorStyle={styles.touchIndicator}
            index={-1}
            snapPoints={snapPoints as [number]}
            enablePanDownToClose={isPanDownEnabled}
            onAnimate={onAnimate}
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
          backdropComponent={withBackdrop ? renderBackdrop : null}
          handleComponent={showDragIndicator ? undefined : null}
          animatedPosition={animatedPosition}
          ref={bottomSheetRef}
          handleStyle={styles.handleStyles}
          backgroundStyle={styles.bgStyle}
          handleIndicatorStyle={styles.touchIndicator}
          index={initialIndex}
          snapPoints={animatedSnapPoints}
          handleHeight={animatedHandleHeight}
          contentHeight={animatedContentHeight}
          enablePanDownToClose={isPanDownEnabled}
          onAnimate={onAnimate}
          bottomInset={bottomInset}
          onChange={onChange}>
          <BottomSheetView onLayout={handleContentLayout}>
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
