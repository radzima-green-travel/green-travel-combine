import {useCallback, useEffect, useRef} from 'react';
import {IBottomMenuRef} from 'atoms/BottomMenu/BottomMenu';
import {useSharedValue} from 'react-native-reanimated';
import {SCREEN_HEIGHT} from 'services/PlatformService';
import {useBackHandler} from './useBackHandler';
import {useKeyboardHeight} from './useKeyboardHeight';
import {TextInput} from 'react-native';
import {useStaticCallback} from 'react-redux-help-kit';

function delay(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export function useBottomMenu() {
  const menuRef = useRef<IBottomMenuRef>(null);
  const animatedPosition = useSharedValue(SCREEN_HEIGHT);

  const textInputRef = useRef<TextInput>(null);

  const {keyboardHeight} = useKeyboardHeight();

  const openMenu = useCallback(() => {
    menuRef.current?.show();
  }, []);

  const isNeedToOpenMenu = useRef(false);

  const focusInput = useStaticCallback(async () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
      return;
    }

    await delay(10);

    return focusInput();
  }, []);

  const openMenuWithInputAutoFocus = useCallback(async () => {
    await focusInput();
    if (keyboardHeight) {
      openMenu();
    } else {
      isNeedToOpenMenu.current = true;
    }
  }, [focusInput, keyboardHeight, openMenu]);

  useEffect(() => {
    if (keyboardHeight && isNeedToOpenMenu.current) {
      openMenu();
      isNeedToOpenMenu.current = false;
    }
  }, [keyboardHeight, openMenu]);

  const closeMenu = useCallback(() => {
    menuRef.current?.hide();
  }, []);

  const isMenuOpened = useCallback(() => {
    return menuRef.current?.isOpened();
  }, []);

  const isMenuOpening = useCallback(() => {
    return menuRef.current?.isOpening();
  }, []);

  const isMenuClosed = useCallback(() => {
    return menuRef.current?.isClosed();
  }, []);

  useBackHandler(() => {
    if (isMenuOpened()) {
      closeMenu();
      return true;
    }

    return false;
  });

  return {
    openMenu,
    closeMenu,
    isMenuOpened,
    ref: menuRef,
    animatedPosition,
    isMenuOpening,
    isMenuClosed,

    keyboardHeight,
    openMenuWithInputAutoFocus,
    textInputRef,
  };
}
