import {useNavigation} from '@react-navigation/native';
import {useSnackbar} from 'atoms';
import {
  useObject,
  useObjectIncompleteFields,
  useOnRequestError,
  useTranslation,
} from 'core/hooks';
import {
  clearShareExperienceData,
  updateVisitedObjectRequest,
  sendInaccuraciesEmailRequest,
} from 'core/reducers';
import {selectObjectShareExperienceData} from 'core/selectors';
import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useOnRequestSuccess, useRequestLoading} from 'react-redux-help-kit';
import {ObjectDetailsShareExperienceScreenNavigationProps} from '../types';
import {useObjectShareExperienceAnalytics} from './useObjectShareExperienceAnalytics';
export function useShareExperienceData() {
  const dispatch = useDispatch();
  const {t} = useTranslation('objectDetails');
  const [isReportSent, setIsReportSent] = useState(false);
  const navigation =
    useNavigation<ObjectDetailsShareExperienceScreenNavigationProps>();
  const {objectId, objectName} =
    useSelector(selectObjectShareExperienceData) || {};

  const object = useObject(objectId || '');
  const incompleteFields = useObjectIncompleteFields(
    object?.category.imcompletedFieldsNames ?? [],
  );
  const {show, ...snackBarProps} = useSnackbar();

  const {
    sendVisitedModalSendEvent,
    sendReportInaccuranceSendEvent,
    onReportInnacuranceFieldValueChange,
    sendReportInaccuranceCloseEvent,
    sendVisitedModalCloseEvent,
    saveRangeForAnalytics,
  } = useObjectShareExperienceAnalytics();

  const onSendPress = useCallback(
    (message: string) => {
      if (objectId) {
        sendReportInaccuranceSendEvent();
        dispatch(
          sendInaccuraciesEmailRequest({
            subject: t('inaccuraciesEmailSubject', {objectName}),
            message: message,
            objectId,
          }),
        );
      }
    },
    [objectId, sendReportInaccuranceSendEvent, dispatch, t, objectName],
  );

  const onMissedDetailsPress = useCallback(() => {
    if (objectId) {
      navigation.navigate('ObjectDetailsAddInfo', {
        objectId: objectId,
        showSuccessMenu: false,
        analytics: {
          fromScreenName: 'VisitedModal',
        },
      });
    }
  }, [navigation, objectId]);

  const onSubmitPress = useCallback(
    ({
      rating,
      minutes,
      hours,
    }: {
      rating: number;
      minutes: number;
      hours: number;
    }) => {
      if (objectId) {
        const spentTime = (hours * 60 + minutes) * 60 * 1000;

        sendVisitedModalSendEvent({
          visitedRating: rating,
          averageTime: `${hours}.${Math.floor((minutes / 60) * 100)}`,
        });
        dispatch(
          updateVisitedObjectRequest({
            objectId,
            data: {timestamp: Date.now(), spentTime, rating},
          }),
        );
      }
    },
    [dispatch, objectId, sendVisitedModalSendEvent],
  );

  useOnRequestError(updateVisitedObjectRequest, 'objectDetails', errorLabel => {
    show({
      type: 'error',
      title: errorLabel.text,
    });
  });
  useOnRequestError(
    sendInaccuraciesEmailRequest,
    'objectDetails',
    errorLabel => {
      show({
        type: 'error',
        title: errorLabel.text,
      });
    },
  );

  useOnRequestSuccess(sendInaccuraciesEmailRequest, () => {
    setIsReportSent(true);
  });

  const {loading: sumbitLoading} = useRequestLoading(
    updateVisitedObjectRequest,
  );
  const {loading: sendLoading} = useRequestLoading(
    sendInaccuraciesEmailRequest,
  );

  const clearInitialData = useCallback(() => {
    dispatch(clearShareExperienceData());
  }, [dispatch]);

  return {
    onSendPress,
    onSubmitPress,
    sendLoading: sendLoading,
    sumbitLoading: sumbitLoading,
    isReportSent: isReportSent,
    clearInitialData,
    snackBarProps,
    onMissedDetailsPress,
    isMissedDetailsButtonVisible: Boolean(incompleteFields.length),
    onReportInnacuranceFieldValueChange,
    sendReportInaccuranceCloseEvent,
    sendVisitedModalCloseEvent,
    saveRangeForAnalytics,
  };
}
