import { call } from 'redux-saga/effects';
import { getObjectsListDataSaga } from 'core/sagas/objectsList/getObjectsListDataSaga';
import { getBookmarksObjectsListRequest } from 'core/actions';

export function* getBookmarksObjectsListSaga(
  action: ReturnType<typeof getBookmarksObjectsListRequest>,
) {
  yield call(getObjectsListDataSaga, action);
}
