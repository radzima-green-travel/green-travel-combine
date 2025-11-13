import {
  GestureEventPayload,
  PinchGestureHandlerEventPayload,
  Gesture,
} from 'react-native-gesture-handler';
import { useEffect } from 'react';

import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import { BackHandler } from 'react-native';

export function usePinchToZoomAnimation({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const isZooming = useSharedValue(false);

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

  const onStart = (
    event: Readonly<GestureEventPayload & PinchGestureHandlerEventPayload>,
  ) => {
    'worklet';
    const x = event.focalX - width / 2;
    const y = event.focalY - height / 2;
    originX.value = x;
    originY.value = y;

    transOriginX.value = x;
    transOriginY.value = y;
    prevNumberOfPointers.value = event.numberOfPointers;
  };

  const pinchHandler = Gesture.Pinch()
    .onStart(event => {
      isZooming.value = true;
      onStart(event);
    })
    .onUpdate(event => {
      focalX.value = event.focalX - width / 2;
      focalY.value = event.focalY - height / 2;
      if (
        (event.numberOfPointers === 2 && prevNumberOfPointers.value === 1)
        || (event.numberOfPointers === 1 && prevNumberOfPointers.value === 2)
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
    })
    .onEnd(() => {
      const reset = () => {
        if (
          scale.value === 1
          && translationX.value === 0
          && translationY.value === 0
        ) {
          isZooming.value = false;
        }
      };
      scale.value = withTiming(1, undefined, reset);
      translationX.value = withTiming(0, undefined, reset);
      translationY.value = withTiming(0, undefined, reset);
    });

  useEffect(() => {
    const backhandler = BackHandler.addEventListener(
      'hardwareBackPress',
      function () {
        scale.value = 1;
        translationX.value = 0;
        translationY.value = 0;
        isZooming.value = false;

        return false;
      },
    );

    return () => {
      backhandler.remove();
    };
  }, [isZooming, scale, translationX, translationY]);

  const transformStyle = useDerivedValue(() => {
    return [
      { translateX: -translationX.value },
      { translateY: -translationY.value },

      { translateX: originX.value },
      { translateY: originY.value },
      { scale: scale.value },
      { translateX: -originX.value },
      { translateY: -originY.value },
    ];
  });

  const zoomableViewAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: transformStyle.value,
    };
  });

  return {
    zoomableViewAnimatedStyle,
    isZooming,
    pinchHandler,
  };
}
