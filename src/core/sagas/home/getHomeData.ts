import {put, select} from 'redux-saga/effects';
import {
  getHomeDataUpdateAvailableRequest,
  getInitialHomeDataRequest,
} from '../../reducers';
import {selectIsHomeDataExists} from '../../selectors';

export function* getHomeDataSaga() {
  const isHomeDataExists = yield select(selectIsHomeDataExists);

  if (isHomeDataExists) {
    yield put(getHomeDataUpdateAvailableRequest());
  } else {
    yield put(getInitialHomeDataRequest());
  }
}
