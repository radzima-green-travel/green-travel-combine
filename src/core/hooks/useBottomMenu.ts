import {useCallback, useRef} from 'react';
import {IBottomMenuRef} from 'atoms/BottomMenu/BottomMenu';
import {useSharedValue} from 'react-native-reanimated';
import {SCREEN_HEIGHT} from 'services/PlatformService';
import {useBackHandler} from './useBackHandler';

export function useBottomMenu() {
  const menuRef = useRef<IBottomMenuRef>(null);
  const animatedPosition = useSharedValue(SCREEN_HEIGHT);

  const openMenu = useCallback(() => {
    menuRef.current?.show();
  }, []);

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
  };
}
