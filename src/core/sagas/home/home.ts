import {takeEvery, takeLeading} from 'redux-saga/effects';

import {ACTIONS} from '../../constants';

import {getInitialHomeDataSaga} from './getInitialHomeDataSaga';
import {getHomeDataSaga} from './getHomeData';
import {checkHomeDataUpdatesAvailabilitySaga} from './checkHomeDataUpdatesAvailability';
import {getHomeDataUpdatesSaga} from './getHomeDataUpdatesSaga';

export function* homeSaga() {
  yield takeLeading(
    ACTIONS.GET_INITIAL_HOME_DATA_REQUEST,
    getInitialHomeDataSaga,
  );
  yield takeLeading(
    ACTIONS.GET_HOME_DATA_UPDATES_REQUEST,
    getHomeDataUpdatesSaga,
  );
  yield takeLeading(
    ACTIONS.GET_HOME_DATA_UPDATE_AVAILABLE_REQUEST,
    checkHomeDataUpdatesAvailabilitySaga,
  );
  yield takeEvery(ACTIONS.GET_HOME_DATA, getHomeDataSaga);
}
