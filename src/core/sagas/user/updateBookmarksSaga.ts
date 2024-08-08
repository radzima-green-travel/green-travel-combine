import {call, put, select} from 'redux-saga/effects';
import {updateBookmarksRequest} from 'core/actions';
import {amplifyApi} from 'api/amplify';
import {selectUserAuthorized} from 'selectors';
import {RequestError} from 'core/errors';

export function* updateBookmarksSaga({
  meta: {failureAction, successAction},
  payload,
}: ReturnType<typeof updateBookmarksRequest>) {
  try {
    const isAuthorized = yield select(selectUserAuthorized);
    if (isAuthorized) {
      yield call(amplifyApi.updateUserBookmarks, payload);
    }

    yield put(successAction());
  } catch (error) {
    yield put(failureAction(error as RequestError));
  }
}
