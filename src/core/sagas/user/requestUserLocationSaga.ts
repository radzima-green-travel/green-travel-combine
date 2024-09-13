import {put} from 'redux-saga/effects';
import {requestUserLocation} from 'core/actions';
import {locationService} from 'services/LocationService';
import {RequestError} from 'core/errors';

export function* requestUserLocationSaga({
  meta: {successAction, failureAction},
}: ReturnType<typeof requestUserLocation>) {
  try {
    const coords = yield locationService.getLowAccuracyCurrentPosition();
    yield put(successAction(coords));
  } catch (error) {
    yield put(failureAction(error as RequestError));
  }
}
