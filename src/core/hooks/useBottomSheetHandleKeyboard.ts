import {useBottomSheetInternal} from '@gorhom/bottom-sheet';
import {PADDING_HORIZONTAL} from 'core/constants';
import {useEffect, useState, useCallback} from 'react';
import {StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isIOS} from 'services/PlatformService';

export function useBottomSheetHandleKeyboard() {
  const {shouldHandleKeyboardEvents} = useBottomSheetInternal();

  useEffect(() => {
    return () => {
      shouldHandleKeyboardEvents.value = false;
    };
  }, [shouldHandleKeyboardEvents]);

  const {bottom} = useSafeAreaInsets();

  const [bottomInset, setBottomInset] = useState(0);

  const onFocus = useCallback(() => {
    shouldHandleKeyboardEvents.value = true;
    setBottomInset(
      isIOS ? 0 : PADDING_HORIZONTAL + Number(StatusBar.currentHeight),
    );
  }, [shouldHandleKeyboardEvents]);

  const onBlur = useCallback(() => {
    shouldHandleKeyboardEvents.value = false;

    setBottomInset(bottom);
  }, [bottom, shouldHandleKeyboardEvents]);

  return {
    bottomInset,
    onFocus,
    onBlur,
  };
}
