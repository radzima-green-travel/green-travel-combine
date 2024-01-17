import {useSnackbar} from 'atoms';
import {useOnRequestError} from 'core/hooks';
import {
  clearShareExperienceData,
  updateVisitedObjectRequest,
} from 'core/reducers';
import {selectObjectShareExperienceData} from 'core/selectors';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRequestLoading} from 'react-redux-help-kit';

export function useShareExperienceData() {
  const dispatch = useDispatch();
  const {objectId} = useSelector(selectObjectShareExperienceData) || {};
  const {show, ...snackBarProps} = useSnackbar();

  const onSendPress = useCallback(() => {}, []);
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

  const {loading: sumbitLoading} = useRequestLoading(
    updateVisitedObjectRequest,
  );

  const clearInitialData = useCallback(() => {
    dispatch(clearShareExperienceData());
  }, [dispatch]);

  return {
    onSendPress,
    onSubmitPress,
    sendLoading: false,
    sumbitLoading: sumbitLoading,
    isReportSent: false,
    clearInitialData,
    snackBarProps,
  };
}
