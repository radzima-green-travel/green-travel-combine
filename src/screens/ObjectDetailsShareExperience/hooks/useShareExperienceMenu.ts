import {useBottomMenu, useStaticCallback} from 'core/hooks';
import {useCallback, useRef, useState} from 'react';
import {hapticFeedbackService} from 'services/HapticFeedbackService';
import {ObjectReportinaccuraciesMenuRef} from 'molecules';
import {Keyboard} from 'react-native';

export function useShareExperienceMenu() {
  const startTime = useRef(Date.now());
  const innaccuraciesMenuRef = useRef<ObjectReportinaccuraciesMenuRef>(null);

  const shareExperienceMenuProps = useBottomMenu();
  const reportInnacurateInfoMenuProps = useBottomMenu();
  const reportInnacurateInfoSuccessMenuProps = useBottomMenu();

  const [rating, setRating] = useState(0);

  const backToInitialMenu = useStaticCallback(() => {
    Keyboard.dismiss();
    shareExperienceMenuProps.openMenu();
    reportInnacurateInfoMenuProps.closeMenu();
  }, [shareExperienceMenuProps, reportInnacurateInfoMenuProps]);

  const openInnacurateInfoMenu = useStaticCallback(() => {
    shareExperienceMenuProps.closeMenu();
    reportInnacurateInfoMenuProps.openMenu();
    innaccuraciesMenuRef.current?.focus();
  }, [shareExperienceMenuProps, reportInnacurateInfoMenuProps]);

  const openInnacurateInfoSuccessMenu = useStaticCallback(() => {
    shareExperienceMenuProps.closeMenu();
    reportInnacurateInfoSuccessMenuProps.openMenu();
  }, [shareExperienceMenuProps, reportInnacurateInfoMenuProps]);

  const addHapticFeedback = useCallback((_: number, minutes: number) => {
    if (minutes % 30 === 0) {
      hapticFeedbackService.trigger('selection');
      startTime.current = Date.now();
    } else {
      const timeGap = Date.now() - startTime.current;

      if (timeGap > 50) {
        hapticFeedbackService.trigger('selection');
      }
      startTime.current = Date.now();
    }
  }, []);

  const getIsAllMenusClosed = useStaticCallback(() => {
    const isShareExperienceMenuClosed = shareExperienceMenuProps.isMenuClosed();

    const isInnacurateInfoMenuClosed =
      reportInnacurateInfoMenuProps.isMenuClosed();
    const isInnacurateInfoSuccessMenuClosed =
      reportInnacurateInfoSuccessMenuProps.isMenuClosed();
    return (
      isShareExperienceMenuClosed &&
      isInnacurateInfoMenuClosed &&
      isInnacurateInfoSuccessMenuClosed
    );
  }, [shareExperienceMenuProps, reportInnacurateInfoMenuProps]);

  return {
    backToInitialMenu,
    openInnacurateInfoMenu,
    rating,
    setRating,
    shareExperienceMenuProps,
    reportInnacurateInfoMenuProps,
    getIsAllMenusClosed,
    innaccuraciesMenuRef,
    reportInnacurateInfoSuccessMenuProps,
    openInnacurateInfoSuccessMenu,
    addHapticFeedback,
  };
}
