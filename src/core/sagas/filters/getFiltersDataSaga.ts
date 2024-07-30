import {call, put} from 'redux-saga/effects';
import {ObjectFiltersDataDTO} from 'core/types';
import {RequestError} from 'core/errors';
import {fetchFiltersData} from './localFetchRequests';
import {getFiltersDataRequest} from 'core/actions';

export function* getFiltersDataSaga({
  meta: {failureAction, successAction},
  payload,
}: ReturnType<typeof getFiltersDataRequest>) {
  try {
    const filtersResult: ObjectFiltersDataDTO = yield call(fetchFiltersData, {
      payload,
    });

    yield put(successAction(filtersResult));
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
