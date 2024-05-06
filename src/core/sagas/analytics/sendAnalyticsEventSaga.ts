import {sendAnalyticsEvent} from 'core/reducers';
import {call} from 'redux-saga/effects';
import {analyticsService} from 'services/AnalyticsService';

export function* sendAnalyticsEventSaga({
  payload,
}: ReturnType<typeof sendAnalyticsEvent>) {
  try {
    yield call([analyticsService, analyticsService.log], payload);
  } catch (e) {
    console.error('sendAnalyticsEventSaga error', e);
  }
}
