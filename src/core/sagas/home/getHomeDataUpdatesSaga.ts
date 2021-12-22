import {call, delay, put, select} from 'redux-saga/effects';

import {getAllAppData} from 'api/graphql/methods';
import {ListMobileDataQuery} from 'api/graphql/types';
import {
  getHomeDataUpdatesFailure,
  getHomeDataUpdatesSuccess,
} from '../../reducers';
import {selectHomeUpdatedData} from '../../selectors';
import {saveHomeDataVersionSaga} from './homeDataVersion';

export function* getHomeDataUpdatesSaga() {
  try {
    const data: ListMobileDataQuery = yield call(() => getAllAppData());

    yield call(saveHomeDataVersionSaga, data);

    yield put(getHomeDataUpdatesSuccess({data: data}));
  } catch (e) {
    const updatedData = yield select(selectHomeUpdatedData);
    if (updatedData) {
      yield delay(700);

      yield put(getHomeDataUpdatesSuccess({data: updatedData}));
      yield call(saveHomeDataVersionSaga, updatedData);
    } else {
      yield put(getHomeDataUpdatesFailure(e));
    }
  }
}
