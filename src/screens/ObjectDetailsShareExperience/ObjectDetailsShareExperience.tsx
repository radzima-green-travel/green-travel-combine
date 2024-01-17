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
import {Keyboard} from 'react-native';
import {updateVisitedObjectRequest} from 'core/reducers';
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
    range,
    setRange,
    rating,
    setRating,
    shareExperienceMenuProps,
    reportInnacurateInfoMenuProps,
    reportInnacurateInfoSuccessMenuProps,
    openInnacurateInfoSuccessMenu,
    getIsAllMenusClosed,
    innaccuraciesMenuRef,
    hours,
    minutes,
  } = useShareExperienceMenu();

  useOnRequestSuccess(
    updateVisitedObjectRequest,
    openInnacurateInfoSuccessMenu,
  );

  const onHideEnd = useCallback(() => {
    if (getIsAllMenusClosed()) {
      clearInitialData();
    }
  }, [clearInitialData, getIsAllMenusClosed]);

  const onSubmitPressHander = useCallback(() => {
    onSubmitPress({rating, hours, minutes});
  }, [hours, onSubmitPress, rating, minutes]);

  const header = useMemo(
    () => ({
      title: t('markAsVisitedMenuTitle'),
      subtitle: t('markAsVisitedMenuSubtitle'),
    }),
    [t],
  );

  const header2 = useMemo(
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
          timeString={`${hours} ${t('hours')} ${minutes} ${t('minutes')}`}
          onSubmitPress={onSubmitPressHander}
          rating={rating}
          timeRange={range}
          onRatingChange={setRating}
          onTimeRangeChange={setRange}
          isSubmitButtonLoading={sumbitLoading}
          isSubmitButtonDisabled={!rating && !range}
          onReportInformationPress={openInnacurateInfoMenu}
          isReportSending={sendLoading}
          isReportSent={isReportSent}
          onSkipPress={shareExperienceMenuProps.closeMenu}
          onMissedDetailsPress={openInnacurateInfoSuccessMenu}
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
        onHideStart={Keyboard.dismiss}
        withBackdrop
        {...reportInnacurateInfoMenuProps}
        header={header2}>
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
