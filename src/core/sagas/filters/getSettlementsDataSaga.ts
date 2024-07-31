import {call, put} from 'redux-saga/effects';
import {getSettlementsDataRequest} from 'core/actions';
import {SettlementsData} from 'core/types';
import {RequestError} from 'core/errors';
import {fetchSettlementsData} from '../fetchRequests';

export function* getSettlementsDataSaga({
  meta: {failureAction, successAction},
}: ReturnType<typeof getSettlementsDataRequest>) {
  try {
    const settlementsData: SettlementsData = yield call(fetchSettlementsData);

    yield put(successAction(settlementsData));
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
