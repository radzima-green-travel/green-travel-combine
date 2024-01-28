import {BottomMenu, SnackBar} from 'atoms';
import {useOnRequestSuccess, useTranslation} from 'core/hooks';
import {TestIDs} from 'core/types/common';
import {
  ObjectShareExperienceMenu,
  ObjectReportinaccuraciesMenu,
  ObjectShareExperienceSuccessMenu,
} from 'molecules';
import React, {useCallback, useMemo} from 'react';
import {useShareExperienceMenu, useShareExperienceData} from './hooks';

import {
  sendInaccuraciesEmailRequest,
  updateVisitedObjectRequest,
} from 'core/reducers';
import {Portal} from '@gorhom/portal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const ObjectDetailsShareExperience = () => {
  const {t} = useTranslation('objectDetails');
  const {top} = useSafeAreaInsets();

  const {
    onSendPress,
    onSubmitPress,
    sendLoading,
    sumbitLoading,
    isReportSent,
    clearInitialData,
    snackBarProps,
  } = useShareExperienceData();

  const {
    backToInitialMenu,
    openInnacurateInfoMenu,
    rating,
    setRating,
    shareExperienceMenuProps,
    reportInnacurateInfoMenuProps,
    reportInnacurateInfoSuccessMenuProps,
    openInnacurateInfoSuccessMenu,
    getIsAllMenusClosed,
    innaccuraciesMenuRef,
    addHapticFeedback,
  } = useShareExperienceMenu();

  useOnRequestSuccess(
    updateVisitedObjectRequest,
    openInnacurateInfoSuccessMenu,
  );

  useOnRequestSuccess(sendInaccuraciesEmailRequest, backToInitialMenu);

  const onHideEnd = useCallback(() => {
    if (getIsAllMenusClosed()) {
      clearInitialData();
    }
  }, [clearInitialData, getIsAllMenusClosed]);

  const header = useMemo(
    () => ({
      title: t('markAsVisitedMenuTitle'),
      subtitle: t('markAsVisitedMenuSubtitle'),
    }),
    [t],
  );

  const reportInnacuraciesHeader = useMemo(
    () => ({
      onBackPress: backToInitialMenu,
      title: t('reportInaccuraciesMenuTitle'),
    }),
    [backToInitialMenu, t],
  );

  return (
    <Portal>
      <BottomMenu
        withBackdrop
        onHideEnd={onHideEnd}
        initialIndex={0}
        testID={TestIDs.ObjectShareExperienceMenu}
        {...shareExperienceMenuProps}
        header={header}>
        <ObjectShareExperienceMenu
          testID={TestIDs.ObjectShareExperienceMenuContent}
          onSubmitPress={onSubmitPress}
          rating={rating}
          onRatingChange={setRating}
          isSubmitButtonLoading={sumbitLoading}
          onReportInformationPress={openInnacurateInfoMenu}
          isReportSending={sendLoading}
          isReportSent={isReportSent}
          onSkipPress={shareExperienceMenuProps.closeMenu}
          onMissedDetailsPress={openInnacurateInfoSuccessMenu}
          onTimeChange={addHapticFeedback}
        />
      </BottomMenu>

      <BottomMenu
        onHideEnd={onHideEnd}
        testID={TestIDs.ObjectShareExperienceSuccessMenu}
        withBackdrop
        {...reportInnacurateInfoSuccessMenuProps}>
        <ObjectShareExperienceSuccessMenu
          testID={TestIDs.ObjectShareExperienceSuccessMenuContent}
          onGotItPress={() => {
            reportInnacurateInfoSuccessMenuProps.closeMenu();
          }}
        />
      </BottomMenu>

      <BottomMenu
        onHideEnd={onHideEnd}
        testID={TestIDs.ObjectReportinaccuraciesMenu}
        withBackdrop
        onBackdropPress={backToInitialMenu}
        {...reportInnacurateInfoMenuProps}
        header={reportInnacuraciesHeader}>
        <ObjectReportinaccuraciesMenu
          ref={innaccuraciesMenuRef}
          onSendPress={onSendPress}
          isSendLoading={sendLoading}
          testID={TestIDs.ObjectReportinaccuraciesMenuContent}
        />
      </BottomMenu>

      <SnackBar offset={-top} isOnTop {...snackBarProps} />
    </Portal>
  );
};
