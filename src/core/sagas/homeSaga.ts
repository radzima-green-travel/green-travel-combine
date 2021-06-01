import {
  call,
  put,
  takeEvery,
  select,
  takeLeading,
  delay,
} from 'redux-saga/effects';
import {
  getInitialHomeDataRequest,
  getInitialHomeDataSuccess,
  getInitialHomeDataFailure,
  getHomeDataUpdateAvailableSuccess,
  getHomeDataUpdateAvailableFailure,
  getHomeDataUpdatesRequest,
  getHomeDataUpdatesSuccess,
  getHomeDataUpdatesFailure,
} from '../reducers';
import {ACTIONS} from '../constants';
import {getCategories} from 'api/native';
import {IGetHomeDataResponse} from '../types';
import {selectIsHomeDataExists, selectHomeUpdatedData} from 'core/selectors';
import {loadingSaga} from './loading';

export function* getInitialHomeDataSaga() {
  try {
    const {
      data: {listMobileObjects: categories},
    }: IGetHomeDataResponse = yield call(() => getCategories());

    yield put(getInitialHomeDataSuccess({data: categories}));
  } catch (e) {
    yield put(getInitialHomeDataFailure(e));
  }
}

export function* getHomeDataUpdatesSaga() {
  try {
    const data: IGetHomeDataResponse = yield call(() => getCategories());
    const updatedData = yield select(selectHomeUpdatedData);
    if (data) {
      const {
        data: {listMobileObjects: categories},
      } = data;

      yield put(getHomeDataUpdatesSuccess({data: categories}));
    } else if (updatedData) {
      yield delay(700);

      yield put(getHomeDataUpdatesSuccess({data: updatedData}));
    } else {
      yield delay(700);
      yield put(getHomeDataUpdatesSuccess({data: null}));
    }
  } catch (e) {
    const updatedData = yield select(selectHomeUpdatedData);
    if (updatedData) {
      yield delay(700);

      yield put(getHomeDataUpdatesSuccess({data: updatedData}));
    } else {
      yield put(getHomeDataUpdatesFailure(e));
    }
  }
}

export function* getHomeDataUpdateAvailableSaga() {
  try {
    const data: IGetHomeDataResponse = yield call(() => getCategories());
    const updateDataLoading = yield call(
      loadingSaga,
      getHomeDataUpdatesRequest,
    );
    const getInitialDataLoading = yield call(
      loadingSaga,
      getInitialHomeDataRequest,
    );

    const loading = updateDataLoading || getInitialDataLoading;

    if (data && !loading) {
      const {
        data: {listMobileObjects: categories},
      } = data;

      yield put(
        getHomeDataUpdateAvailableSuccess({
          updatedData: categories,
        }),
      );
    } else {
      yield put(
        getHomeDataUpdateAvailableSuccess({
          updatedData: null,
        }),
      );
    }
  } catch (e) {
    yield put(getHomeDataUpdateAvailableFailure(e));
  }
}

export function* getHomeDataSaga() {
  const isHomeDataExists = yield select(selectIsHomeDataExists);

  if (isHomeDataExists) {
    yield put(getHomeDataUpdatesRequest());
  } else {
    yield put(getInitialHomeDataRequest());
  }
}

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
    getHomeDataUpdateAvailableSaga,
  );
  yield takeEvery(ACTIONS.GET_HOME_DATA, getHomeDataSaga);
}
