import { useNavigation } from '@react-navigation/core';
import React, { PropsWithChildren, memo } from 'react';

import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  GestureEventPayload,
  PinchGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Reanimated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { isIOS, isAndroid } from 'services/PlatformService';

interface IProps {
  width: number;
  height: number;
}

export const ZoomableView = memo(
  ({ children, width, height }: PropsWithChildren<IProps>) => {
    const navigation = useNavigation();
    const isStart = useSharedValue(false);

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

    const pinchHandler =
      useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
        onStart: event => {
          if (isIOS) {
            onStart(event);
          } else {
            isStart.value = true;
          }
        },
        onActive: event => {
          if (isAndroid && isStart.value) {
            isStart.value = false;
            onStart(event);
          }

          focalX.value = event.focalX - width / 2;
          focalY.value = event.focalY - height / 2;
          if (
            (event.numberOfPointers === 2 && prevNumberOfPointers.value === 1)
            || (event.numberOfPointers === 1
              && prevNumberOfPointers.value === 2)
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

        onFinish: () => {
          scale.value = withTiming(1);
          translationX.value = withTiming(0);
          translationY.value = withTiming(0);
        },
      });

    React.useEffect(() => {
      const unsubscribe = navigation.addListener('beforeRemove', () => {
        scale.value = 1;
        translationX.value = 0;
        translationY.value = 0;
      });

      return unsubscribe;
    }, [navigation, scale, translationX, translationY]);

    const rStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: -translationX.value },
          { translateY: -translationY.value },

          { translateX: originX.value },
          { translateY: originY.value },
          { scale: scale.value },
          { translateX: -originX.value },
          { translateY: -originY.value },
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
