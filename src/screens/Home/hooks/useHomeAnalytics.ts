import {sendAnalyticsEvent} from 'core/actions';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

export function useHomeAnalytics() {
  const dispatch = useDispatch();
  const sendSearchViewEvent = useCallback(() => {
    dispatch(sendAnalyticsEvent({name: 'Search_view'}));
  }, [dispatch]);

  return {sendSearchViewEvent};
}
