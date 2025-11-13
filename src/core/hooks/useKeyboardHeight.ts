import { KEYBOARD_SHOW_EVENT } from 'core/constants';
import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import {
  getDeviceKeyuboardHeight,
  setDeviceKeyboardHeight,
} from 'services/PlatformService';

export function useKeyboardHeight() {
  const [keyboardHeight, setKeyboardHeight] = useState(
    getDeviceKeyuboardHeight(),
  );

  useEffect(() => {
    const listener = Keyboard.addListener(KEYBOARD_SHOW_EVENT, event => {
      if (keyboardHeight !== event.endCoordinates.height) {
        setKeyboardHeight(event.endCoordinates.height);
        setDeviceKeyboardHeight(event.endCoordinates.height);
      }
    });

    return () => {
      listener.remove();
    };
  }, [keyboardHeight]);

  return {
    keyboardHeight,
  };
}
