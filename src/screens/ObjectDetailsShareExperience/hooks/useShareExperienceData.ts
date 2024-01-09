import {clearShareExperienceData} from 'core/reducers';
import {selectObjectShareExperienceData} from 'core/selectors';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export function useShareExperienceData() {
  const dispatch = useDispatch();
  const {objectId} = useSelector(selectObjectShareExperienceData) || {};

  const onSendPress = useCallback(() => {}, []);
  const onSubmitPress = useCallback(() => {}, []);

  const clearInitialData = useCallback(() => {
    dispatch(clearShareExperienceData());
  }, [dispatch]);

  return {
    onSendPress,
    onSubmitPress,
    sendLoading: false,
    sumbitLoading: false,
    isReportSent: false,
    clearInitialData,
  };
}
