import {useCallback, useRef} from 'react';
import {IBottomMenuRef} from 'atoms/BottomMenu/BottomMenu';
import {useSharedValue} from 'react-native-reanimated';

export function useBottomMenu() {
  const menuRef = useRef<IBottomMenuRef>(null);
  const animatedPosition = useSharedValue(-1);

  const openMenu = useCallback(() => {
    menuRef.current?.show();
  }, []);

  const closeMenu = useCallback(() => {
    menuRef.current?.hide();
  }, []);

  const isMenuOpened = useCallback(() => {
    return menuRef.current?.isOpened();
  }, []);

  return {openMenu, closeMenu, isMenuOpened, ref: menuRef, animatedPosition};
}
