import {useSnackbar} from 'atoms';
import {useOnRequestError, useTranslation} from 'core/hooks';
import {
  clearShareExperienceData,
  updateVisitedObjectRequest,
  sendInaccuraciesEmailRequest,
} from 'core/reducers';
import {selectObjectShareExperienceData} from 'core/selectors';
import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useOnRequestSuccess, useRequestLoading} from 'react-redux-help-kit';

export function useShareExperienceData() {
  const dispatch = useDispatch();
  const {t} = useTranslation('objectDetails');
  const [isReportSent, setIsReportSent] = useState(false);
  const {objectId, objectName} =
    useSelector(selectObjectShareExperienceData) || {};
  const {show, ...snackBarProps} = useSnackbar();

  const onSendPress = useCallback(
    (message: string) => {
      dispatch(
        sendInaccuraciesEmailRequest({
          subject: t('inaccuraciesEmailSubject', {objectName}),
          message: message,
        }),
      );
    },
    [dispatch, objectName, t],
  );
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
        dispatch(
          updateVisitedObjectRequest({
            objectId,
            data: {timestamp: Date.now(), spentTime, rating},
          }),
        );
      }
    },
    [dispatch, objectId],
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
  };
}
