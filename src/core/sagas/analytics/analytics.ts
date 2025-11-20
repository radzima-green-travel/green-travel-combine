import { sendAnalyticsEvent } from '../../actions/appConfiguration';
import { takeEvery } from 'redux-saga/effects';
import { sendAnalyticsEventSaga } from './sendAnalyticsEventSaga';

export function* analytics() {
  yield takeEvery(sendAnalyticsEvent, sendAnalyticsEventSaga);
}
