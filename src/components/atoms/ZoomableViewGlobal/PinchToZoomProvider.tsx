import React, {PropsWithChildren, memo, useMemo} from 'react';
import {PinchToZoomContext} from './context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleProp, ViewStyle} from 'react-native';
import {SharedValue} from 'react-native-reanimated';

interface PinchToZoomProviderProps {
  style?: StyleProp<ViewStyle>;
  scrollYOffsetAnimatedValue?: SharedValue<number>;
}

export const PinchToZoomProvider = memo(
  ({
    children,
    style,
    scrollYOffsetAnimatedValue,
  }: PropsWithChildren<PinchToZoomProviderProps>) => {
    const value = useMemo(
      () => ({
        scrollYOffsetAnimatedValue,
      }),
      [scrollYOffsetAnimatedValue],
    );

    return (
      <PinchToZoomContext.Provider value={value}>
        <GestureHandlerRootView style={style}>
          {children}
        </GestureHandlerRootView>
      </PinchToZoomContext.Provider>
    );
  },
);
