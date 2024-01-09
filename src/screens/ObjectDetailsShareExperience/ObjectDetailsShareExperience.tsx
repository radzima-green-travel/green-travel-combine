import {BottomMenu} from 'atoms';
import {useTranslation} from 'core/hooks';
import {TestIDs} from 'core/types/common';
import {
  ObjectShareExperienceMenu,
  ObjectReportinaccuraciesMenu,
  ObjectShareExperienceSuccessMenu,
} from 'molecules';
import React, {useCallback, useMemo} from 'react';
import {useShareExperienceMenu, useShareExperienceData} from './hooks';
import {Keyboard} from 'react-native';

export const ObjectDetailsShareExperience = () => {
  const {
    onSendPress,
    onSubmitPress,
    sendLoading,
    sumbitLoading,
    isReportSent,
    clearInitialData,
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
  } = useShareExperienceMenu();

  const onHideEnd = useCallback(() => {
    if (getIsAllMenusClosed()) {
      clearInitialData();
    }
  }, [clearInitialData, getIsAllMenusClosed]);

  const {t} = useTranslation('objectDetails');

  const hours = Math.floor(range);
  const minutes = Math.ceil((range - hours) * 60);

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
    <>
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
          onSubmitPress={onSubmitPress}
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
            shareExperienceMenuProps.openMenu();
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
    </>
  );
};
