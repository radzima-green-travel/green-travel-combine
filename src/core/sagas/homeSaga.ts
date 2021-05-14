import {
  call,
  put,
  takeEvery,
  select,
  takeLeading,
  delay,
} from 'redux-saga/effects';
import {
  getHomeDataSuccess,
  getHomeDataFailure,
  getHomeDataUpdateAvailableSuccess,
  getHomeDataUpdateAvailableFailure,
  getHomeDataUpdateAvailableRequest,
  getHomeDataRequest,
} from '../reducers';
import {ACTIONS} from '../constants';
import {getCategories, getUpdatesAvailability} from 'api/native';
import {IGetHomeDataResponse, IGetHomeDataAvailabilityResponse} from '../types';
import {
  selectIsHomeDataExists,
  selectHomeUpdatedData,
  selectHomeDataHash,
  selectHomeUpdatedHash,
} from 'core/selectors';

export function* getHomeDataSaga() {
  try {
    const updatedData = yield select(selectHomeUpdatedData);
    if (updatedData) {
      const updatedHash = yield select(selectHomeUpdatedHash);
      yield delay(300);

      yield put(getHomeDataSuccess({data: updatedData, dataHash: updatedHash}));
    } else {
      const {
        data: {
          listMobileObjects: categories,
          getObjectsMetadata: {value},
        },
      }: IGetHomeDataResponse = yield call(getCategories);
      yield put(getHomeDataSuccess({data: categories, dataHash: value}));
    }
  } catch (e) {
    yield put(getHomeDataFailure(e));
  }
}

export function* getHomeDataUpdatesSaga() {
  try {
    const {
      data: {
        getObjectsMetadata: {value},
      },
    }: IGetHomeDataAvailabilityResponse = yield call(getUpdatesAvailability);
    const dataHash = yield select(selectHomeDataHash);

    if (dataHash !== value) {
      const {
        data: {
          listMobileObjects: categories,
          getObjectsMetadata: {value: updatedHash},
        },
      }: IGetHomeDataResponse = yield call(getCategories);

      yield put(
        getHomeDataUpdateAvailableSuccess({
          updatedData: categories,
          updatedHash: updatedHash,
        }),
      );
    } else {
      yield put(
        getHomeDataUpdateAvailableSuccess({
          updatedData: null,
          updatedHash: null,
        }),
      );
    }
  } catch (e) {
    yield put(getHomeDataUpdateAvailableFailure(e));
  }
}

export function* checkHomeDataSaga() {
  const isHomeDataExists = yield select(selectIsHomeDataExists);

  if (isHomeDataExists) {
    yield put(getHomeDataUpdateAvailableRequest());
  } else {
    yield put(getHomeDataRequest());
  }
}

export function* homeSaga() {
  yield takeLeading(ACTIONS.GET_HOME_DATA_REQUEST, getHomeDataSaga);
  yield takeLeading(
    ACTIONS.GET_HOME_DATA_UPDATE_AVAILABLE_REQUEST,
    getHomeDataUpdatesSaga,
  );
  yield takeEvery(ACTIONS.CHECK_HOME_DATA, checkHomeDataSaga);
}
