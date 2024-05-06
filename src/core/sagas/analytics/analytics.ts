import {ACTIONS} from 'core/constants';
import {takeEvery} from 'redux-saga/effects';
import {sendAnalyticsEventSaga} from './sendAnalyticsEventSaga';

export function* analytics() {
  yield takeEvery(ACTIONS.SEND_ANALYTICS_EVENT, sendAnalyticsEventSaga);
}
