import { call, put, select } from 'redux-saga/effects';
import { selectBookmarksData } from 'selectors';
import { Bookmarks, GetBookmarksResponse } from 'core/types';
import { syncAndGetBookmarksRequest } from 'core/actions';
import { amplifyApi } from 'api/amplify';
import { RequestError } from 'core/errors';

export function* syncAndGetBookmarksSaga({
  meta: { failureAction, successAction },
}: ReturnType<typeof syncAndGetBookmarksRequest>) {
  try {
    let bookmarks: Bookmarks = yield select(selectBookmarksData);

    yield call(amplifyApi.bulkUpdateUserBookmarks, bookmarks);

    const { data }: GetBookmarksResponse = yield call(
      amplifyApi.getUserBookmarks,
    );
    bookmarks = data;

    yield put(successAction(bookmarks));
  } catch (error) {
    yield put(failureAction(error as RequestError));
  }
}
