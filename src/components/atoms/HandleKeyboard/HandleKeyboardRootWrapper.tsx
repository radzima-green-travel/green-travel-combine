import React, {
  memo,
  useState,
  useCallback,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import {KEYBOARD_SHOW_EVENT, KEYBOARD_HIDE_EVENT} from 'core/constants';

import {View, StyleSheet, Keyboard} from 'react-native';
import {isIOS} from 'services/PlatformService';

type Props = {
  children: ReactNode;
  testID?: string;
};

export const HandleKeyboardRootWrapper = memo<Props>(
  ({children, testID}: Props) => {
    const [style, setStyle] = useState<{flex: 1} | {height: number}>({
      flex: 1,
    });

    const isKeyboardOpened = useRef(false);

    useEffect(() => {
      if (!isIOS) {
        const listener = Keyboard.addListener(KEYBOARD_SHOW_EVENT, () => {
          isKeyboardOpened.current = true;
        });
        return () => {
          listener.remove();
        };
      }
    }, []);

    useEffect(() => {
      if (!isIOS) {
        const listener = Keyboard.addListener(KEYBOARD_HIDE_EVENT, () => {
          isKeyboardOpened.current = false;
        });
        return () => {
          listener.remove();
        };
      }
    }, []);

    const setAppHeight = useCallback(({nativeEvent}) => {
      const {
        layout: {height},
      } = nativeEvent;
      if (!isKeyboardOpened.current || isIOS) {
        setStyle({height});
      }
    }, []);

    return (
      <>
        <View
          onLayout={setAppHeight}
          style={StyleSheet.absoluteFillObject}
          testID={testID}
        />
        <View style={style}>{children}</View>
      </>
    );
  },
);
