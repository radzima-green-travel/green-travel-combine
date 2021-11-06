import React, {PropsWithChildren, memo} from 'react';

import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Reanimated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface IProps {
  width: number;
  height: number;
}

export const ZoomableView = memo(
  ({children, width, height}: PropsWithChildren<IProps>) => {
    const scale = useSharedValue(1);
    const lastScale = useSharedValue(1);

    const prevNumberOfPointers = useSharedValue(0);

    const originX = useSharedValue(0);
    const originY = useSharedValue(0);

    const transOriginX = useSharedValue(0);
    const transOriginY = useSharedValue(0);

    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);

    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);

    const pinchHandler =
      useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
        onStart: event => {
          const x = event.focalX - width / 2;
          const y = event.focalY - height / 2;

          originX.value = x;
          originY.value = y;

          transOriginX.value = x;
          transOriginY.value = y;
          prevNumberOfPointers.value = event.numberOfPointers;
        },
        onActive: event => {
          focalX.value = event.focalX - width / 2;
          focalY.value = event.focalY - height / 2;

          if (
            (event.numberOfPointers === 2 &&
              prevNumberOfPointers.value === 1) ||
            (event.numberOfPointers === 1 && prevNumberOfPointers.value === 2)
          ) {
            transOriginX.value = translationX.value + focalX.value;
            transOriginY.value = translationY.value + focalY.value;
          }

          prevNumberOfPointers.value = event.numberOfPointers;

          const diff = event.scale - lastScale.value;
          lastScale.value = event.scale;
          scale.value = Math.min(Math.max(scale.value + diff, 1), Infinity);

          translationX.value = transOriginX.value - focalX.value;
          translationY.value = transOriginY.value - focalY.value;
        },

        onEnd: () => {
          scale.value = withTiming(1);
          translationX.value = withTiming(0);
          translationY.value = withTiming(0);
        },
      });

    const rStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {translateX: -translationX.value},
          {translateY: -translationY.value},

          {translateX: originX.value},
          {translateY: originY.value},
          {scale: scale.value},
          {translateX: -originX.value},
          {translateY: -originY.value},
        ],
      };
    });

    return (
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <Reanimated.View>
          <Reanimated.View style={rStyle}>{children}</Reanimated.View>
        </Reanimated.View>
      </PinchGestureHandler>
    );
  },
);
