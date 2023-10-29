import React, {PropsWithChildren, memo, useMemo} from 'react';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';

export const NativeScrollGestureDetector = memo(
  ({children}: PropsWithChildren<{}>) => {
    const scrollGesture = useMemo(() => Gesture.Native(), []);

    return (
      <GestureDetector gesture={scrollGesture}>{children}</GestureDetector>
    );
  },
);
