import {call, put} from 'redux-saga/effects';
import {getAllAppData} from 'api/graphql/methods';
import {ListMobileDataQuery} from 'api/graphql/types';
import {
  getInitialHomeDataSuccess,
  getInitialHomeDataFailure,
} from '../../reducers';
import {saveHomeDataVersionSaga} from './homeDataVersion';

export function* getInitialHomeDataSaga() {
  try {
    const {data}: {data: ListMobileDataQuery} = yield call(() =>
      getAllAppData(),
    );

    yield call(saveHomeDataVersionSaga, data);
    yield put(getInitialHomeDataSuccess({data: data}));
  } catch (e) {
    yield put(getInitialHomeDataFailure(e));
  }
}
