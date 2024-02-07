import {useBackHandler, useBottomMenu, useStaticCallback} from 'core/hooks';
import {useCallback, useRef, useState} from 'react';
import {hapticFeedbackService} from 'services/HapticFeedbackService';
import {ObjectReportinaccuraciesMenuRef} from 'molecules';
import {Keyboard} from 'react-native';
import {useDerivedValue, useSharedValue} from 'react-native-reanimated';

export function useShareExperienceMenu() {
  const startTime = useRef(Date.now());
  const innaccuraciesMenuRef = useRef<ObjectReportinaccuraciesMenuRef>(null);

  const shareExperienceMenuProps = useBottomMenu();
  const reportInnacurateInfoMenuProps = useBottomMenu();
  const reportInnacurateInfoSuccessMenuProps = useBottomMenu();

  const shareExperienceMenuAnimatedIndex = useSharedValue(-1);
  const shareExperienceSuccessMenuAnimatedIndex = useSharedValue(-1);

  const isMenuTransition = useSharedValue(false);
  const mainMenuAnimatedIndexName = useSharedValue<'share' | 'success'>(
    'share',
  );

  const backdropAnimatedIndex = useDerivedValue(() => {
    if (isMenuTransition.value) {
      return 0;
    }

    if (mainMenuAnimatedIndexName.value === 'success') {
      return shareExperienceSuccessMenuAnimatedIndex.value;
    }

    return shareExperienceMenuAnimatedIndex.value;
  });

  const [rating, setRating] = useState(0);

  const backToInitialMenu = useStaticCallback(() => {
    Keyboard.dismiss();
    shareExperienceMenuProps.openMenu();
    reportInnacurateInfoMenuProps.closeMenu();
  }, [shareExperienceMenuProps, reportInnacurateInfoMenuProps]);

  const openInnacurateInfoMenu = useStaticCallback(() => {
    isMenuTransition.value = true;
    shareExperienceMenuProps.closeMenu();
    reportInnacurateInfoMenuProps.openMenu();
    innaccuraciesMenuRef.current?.focus();
  }, [shareExperienceMenuProps, reportInnacurateInfoMenuProps]);

  const openInnacurateInfoSuccessMenu = useStaticCallback(() => {
    isMenuTransition.value = true;

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

    if (!isShareExperienceMenuClosed || !isInnacurateInfoSuccessMenuClosed) {
      isMenuTransition.value = false;

      mainMenuAnimatedIndexName.value = !isInnacurateInfoSuccessMenuClosed
        ? 'success'
        : 'share';
    }
    return (
      isShareExperienceMenuClosed &&
      isInnacurateInfoMenuClosed &&
      isInnacurateInfoSuccessMenuClosed
    );
  }, [shareExperienceMenuProps, reportInnacurateInfoMenuProps]);

  const onBackdropPress = useCallback(() => {
    if (reportInnacurateInfoMenuProps.isMenuOpened()) {
      backToInitialMenu();
    } else {
      shareExperienceMenuProps.closeMenu();
      reportInnacurateInfoSuccessMenuProps.closeMenu();
    }
  }, [
    backToInitialMenu,
    reportInnacurateInfoMenuProps,
    reportInnacurateInfoSuccessMenuProps,
    shareExperienceMenuProps,
  ]);

  useBackHandler(() => {
    if (reportInnacurateInfoMenuProps.isMenuOpened()) {
      backToInitialMenu();
      return true;
    }

    return false;
  });

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
    shareExperienceMenuAnimatedIndex,
    shareExperienceSuccessMenuAnimatedIndex,
    backdropAnimatedIndex,
    onBackdropPress,
  };
}
