import {put} from 'redux-saga/effects';
import {getInitialFiltersSaga} from './getInitialFiltersSaga';
import {fetchInitialFilters} from '../../actions';
import {RequestError} from '../../errors';

export function* fetchInitialFiltersSaga({
  meta,
}: ReturnType<typeof fetchInitialFilters>) {
  try {
    const {regionsList, categoriesList} = yield* getInitialFiltersSaga();

    yield put(meta.successAction({regionsList, categoriesList}));
  } catch (e) {
    yield put(meta.failureAction(e as RequestError));
  }
}
