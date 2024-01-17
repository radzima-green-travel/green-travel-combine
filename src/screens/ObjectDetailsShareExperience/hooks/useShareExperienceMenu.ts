import {useBottomMenu, useStaticCallback, useUpdateEffect} from 'core/hooks';
import {useCallback, useRef, useState} from 'react';
import {hapticFeedbackService} from 'services/HapticFeedbackService';
import {ObjectReportinaccuraciesMenuRef} from 'molecules';

export function useShareExperienceMenu() {
  const startTime = useRef(Date.now());
  const innaccuraciesMenuRef = useRef<ObjectReportinaccuraciesMenuRef>(null);

  const shareExperienceMenuProps = useBottomMenu();
  const reportInnacurateInfoMenuProps = useBottomMenu();
  const reportInnacurateInfoSuccessMenuProps = useBottomMenu();

  const [range, setRange] = useState(0);
  const [rating, setRating] = useState(0);

  const backToInitialMenu = useStaticCallback(() => {
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

  const hours = Math.floor(range);
  const minutes = Math.ceil((range - hours) * 60);

  const addHapticFeedback = useCallback(() => {
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
  }, [minutes]);

  useUpdateEffect(() => {
    addHapticFeedback();
  }, [addHapticFeedback]);

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
    range,
    setRange,
    rating,
    setRating,
    shareExperienceMenuProps,
    reportInnacurateInfoMenuProps,
    getIsAllMenusClosed,
    innaccuraciesMenuRef,
    reportInnacurateInfoSuccessMenuProps,
    openInnacurateInfoSuccessMenu,
    minutes,
    hours,
  };
}
