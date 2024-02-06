import {useBottomMenu} from 'core/hooks';
import {useCallback, useRef} from 'react';
import {Keyboard, TextInput} from 'react-native';

export function useReportInaccuracies() {
  const innaccuraciesMenuRef = useRef<TextInput>(null);
  const reportInnacurateInfoMenuProps = useBottomMenu();
  const reportInnacurateInfoSuccessMenuProps = useBottomMenu();

  const openInnacurateInfoMenu = useCallback(() => {
    innaccuraciesMenuRef.current?.focus();
    reportInnacurateInfoMenuProps.openMenu();
  }, [reportInnacurateInfoMenuProps]);

  const openInnacurateInfoSuccessMenu = useCallback(() => {
    Keyboard.dismiss();
    reportInnacurateInfoMenuProps.closeMenu();
    reportInnacurateInfoSuccessMenuProps.openMenu();
  }, [reportInnacurateInfoMenuProps, reportInnacurateInfoSuccessMenuProps]);

  return {
    innaccuraciesMenuRef,
    reportInnacurateInfoMenuProps,
    openInnacurateInfoMenu,
    reportInnacurateInfoSuccessMenuProps,
    openInnacurateInfoSuccessMenu,
  };
}
