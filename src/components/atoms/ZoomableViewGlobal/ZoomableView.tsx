import React, {
  PropsWithChildren,
  memo,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';

import Reanimated, {
  useAnimatedStyle,
  runOnJS,
  useDerivedValue,
  useAnimatedReaction,
} from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import { Portal } from '@gorhom/portal';
import { usePinchToZoomAnimation } from './usePinchToZoomAnimation';
import { PinchToZoomContext } from './context';
import { styles } from './styles';

interface IProps {
  width: number;
  height: number;
  pushOnTopElement?: React.ReactNode;
  position?: {
    left: number;
    top: number;
  };
}

export const ZoomableView = memo(
  ({
    children,
    width,
    height,
    pushOnTopElement,
    position,
  }: PropsWithChildren<IProps>) => {
    const { scrollYOffsetAnimatedValue } = useContext(PinchToZoomContext);
    const [elementPosition, setElementPosition] = useState<{
      left: number;
      top: number;
      width: number;
      height: number;
    } | null>(position ? { ...position, width, height } : null);
    const [isPortalVisible, setIsPortalVisible] = useState(false);
    const elementRef = useRef<Reanimated.View>(null);

    const { zoomableViewAnimatedStyle, isZooming, pinchHandler } =
      usePinchToZoomAnimation({
        width: width,
        height: height,
      });

    useAnimatedReaction(
      () => {
        return isZooming.value;
      },
      portalVisible => {
        runOnJS(setIsPortalVisible)(portalVisible);
      },
    );

    const isNeedToCalculatePosition = !position;

    useEffect(() => {
      if (isNeedToCalculatePosition) {
        setTimeout(() => {
          elementRef?.current?.measureInWindow((_, y, w, h) => {
            setElementPosition({
              left: 0,
              top: y + (scrollYOffsetAnimatedValue?.value || 0),
              width: w,
              height: h,
            });
          });
        }, 100);
      }
    }, [scrollYOffsetAnimatedValue, isNeedToCalculatePosition]);

    const top = useDerivedValue(() => {
      if (scrollYOffsetAnimatedValue && elementPosition) {
        return elementPosition.top - scrollYOffsetAnimatedValue.value;
      }

      return 0;
    }, [elementPosition, scrollYOffsetAnimatedValue]);

    const topPositionWithScrollYOffset = useAnimatedStyle(() => {
      return {
        top: top.value,
      };
    });

    return (
      <>
        <GestureDetector gesture={pinchHandler}>
          <Reanimated.View style={{ width, height }}>
            <Reanimated.View
              style={[{ width, height }, zoomableViewAnimatedStyle]}
              ref={elementRef}>
              {children}
            </Reanimated.View>
          </Reanimated.View>
        </GestureDetector>

        {elementPosition && isPortalVisible ? (
          <Portal>
            <Reanimated.View
              pointerEvents="none"
              style={[
                styles.portalContent,
                elementPosition,
                topPositionWithScrollYOffset,
                zoomableViewAnimatedStyle,
              ]}>
              {pushOnTopElement || children}
            </Reanimated.View>
          </Portal>
        ) : null}
      </>
    );
  },
);
