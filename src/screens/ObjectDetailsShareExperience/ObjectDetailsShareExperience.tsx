import {BottomMenu, SnackBar, Backdrop} from 'atoms';
import {useColorScheme, useOnRequestSuccess, useTranslation} from 'core/hooks';
import {
  ObjectShareExperienceMenu,
  ObjectReportinaccuraciesMenu,
  ObjectSuccessMenu,
} from 'molecules';
import React, {useCallback, useMemo} from 'react';
import {useShareExperienceMenu, useShareExperienceData} from './hooks';

import {
  sendInaccuraciesEmailRequest,
  updateVisitedObjectRequest,
} from 'core/reducers';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const ObjectDetailsShareExperience = () => {
  const {t} = useTranslation('objectDetails');
  const {top} = useSafeAreaInsets();
  const theme = useColorScheme();

  const {
    onSendPress,
    onSubmitPress,
    sendLoading,
    sumbitLoading,
    isReportSent,
    clearInitialData,
    snackBarProps,
    onMissedDetailsPress,
    isMissedDetailsButtonVisible,
    onReportInnacuranceFieldValueChange,
    sendReportInaccuranceCloseEvent,
    sendVisitedModalCloseEvent,
  } = useShareExperienceData();

  const {
    backToInitialMenu,
    openInnacurateInfoMenu,
    rating,
    setRating,
    range,
    onRangeChangeHandler,
    shareExperienceMenuProps,
    reportInnacurateInfoMenuProps,
    reportInnacurateInfoSuccessMenuProps,
    openInnacurateInfoSuccessMenu,
    getIsAllMenusClosed,
    innaccuraciesMenuRef,
    backdropAnimatedIndex,
    shareExperienceMenuAnimatedIndex,
    shareExperienceSuccessMenuAnimatedIndex,
    onBackdropPress,
  } = useShareExperienceMenu();

  useOnRequestSuccess(
    updateVisitedObjectRequest,
    openInnacurateInfoSuccessMenu,
  );

  useOnRequestSuccess(sendInaccuraciesEmailRequest, backToInitialMenu);

  const onHideEnd = useCallback(() => {
    if (getIsAllMenusClosed()) {
      clearInitialData();
      sendVisitedModalCloseEvent(Boolean(range || rating));
    }
  }, [
    clearInitialData,
    getIsAllMenusClosed,
    rating,
    range,
    sendVisitedModalCloseEvent,
  ]);

  const onReportInnacuranceMenuHide = useCallback(() => {
    sendReportInaccuranceCloseEvent();
    onHideEnd();
  }, [onHideEnd, sendReportInaccuranceCloseEvent]);
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
    <>
      <Backdrop
        animatedIndex={backdropAnimatedIndex}
        onPress={onBackdropPress}
      />

      <BottomMenu
        onHideEnd={onHideEnd}
        initialIndex={0}
        animatedIndex={shareExperienceMenuAnimatedIndex}
        testID={'bottomMenu'}
        {...shareExperienceMenuProps}
        header={header}>
        <ObjectShareExperienceMenu
          testID={'shareExperienceMenuContent'}
          onSubmitPress={onSubmitPress}
          rating={rating}
          range={range}
          onRatingChange={setRating}
          isSubmitButtonLoading={sumbitLoading}
          onReportInformationPress={openInnacurateInfoMenu}
          isReportSending={sendLoading}
          isReportSent={isReportSent}
          onSkipPress={shareExperienceMenuProps.closeMenu}
          onMissedDetailsPress={onMissedDetailsPress}
          isMissedDetailsButtonVisible={isMissedDetailsButtonVisible}
          onRangeChange={onRangeChangeHandler}
        />
      </BottomMenu>

      <BottomMenu
        onHideEnd={onHideEnd}
        animatedIndex={shareExperienceSuccessMenuAnimatedIndex}
        testID={'bottomMenu'}
        {...reportInnacurateInfoSuccessMenuProps}>
        <ObjectSuccessMenu
          testID={'successMenuContent'}
          title={t('shareExperienceSuccessTitle')}
          subtitle={t('shareExperienceSuccessSubtitle')}
          buttonText={t('gotIt')}
          onPress={reportInnacurateInfoSuccessMenuProps.closeMenu}
          imageAsset={
            theme === 'light' ? 'imageRatingLight' : 'imageRatingDark'
          }
        />
      </BottomMenu>

      <BottomMenu
        onHideEnd={onReportInnacuranceMenuHide}
        testID={'bottomMenu'}
        {...reportInnacurateInfoMenuProps}
        header={reportInnacuraciesHeader}>
        <ObjectReportinaccuraciesMenu
          ref={innaccuraciesMenuRef}
          onSendPress={onSendPress}
          onInputValueChange={onReportInnacuranceFieldValueChange}
          autoHandleKeyboard
          isSendLoading={sendLoading}
          testID={'reportInaccuraciesMenu'}
        />
      </BottomMenu>

      <SnackBar testID="snackBar" offset={-top} isOnTop {...snackBarProps} />
    </>
  );
};
