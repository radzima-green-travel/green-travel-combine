import {call, put, takeEvery, takeLatest, select} from 'redux-saga/effects';
import {
  getObjectsForBookmarkFailure,
  getObjectsForBookmarkRequest,
  getObjectsForBookmarkSuccess,
  addToBookmarksRequest,
  addToBookmarksSuccess,
  addToBookmarksFailure,
  getSavedBookmarksIdsSuccess,
  getSavedBookmarksIdsFailure,
  IAddToBookmarksSuccess,
} from '../reducers';
import {ACTIONS} from '../constants';
import {getObjectsById} from 'api/native';
import {IObject, IBookmarksIds} from '../types';
import {ActionType} from 'typesafe-actions';
import {
  saveBookmarkToStorage,
  removeBookmarkFromStorage,
  getBookmarksFromStorage,
} from 'storage';
import {LayoutAnimation} from 'react-native';
import * as NavigationService from 'services/NavigationService';
import {selectSavedBookmarks} from 'core/selectors';

export function* getObjectsForBookmarkSaga({
  payload,
}: ActionType<typeof getObjectsForBookmarkRequest>) {
  try {
    const objects: IObject[] = yield call(getObjectsById, payload);

    yield put(getObjectsForBookmarkSuccess(objects));
  } catch (e) {
    yield put(getObjectsForBookmarkFailure(e));
  }
}

export function* addToBookmarksSaga({
  payload,
}: ActionType<typeof addToBookmarksRequest>) {
  try {
    const {needToAdd, removeWithAnimation = false, ...data} = payload;
    const value: IAddToBookmarksSuccess | null = yield call(
      needToAdd ? saveBookmarkToStorage : removeBookmarkFromStorage,
      data,
    );
    if (!needToAdd && removeWithAnimation) {
      const savedBookmarks: ReturnType<typeof selectSavedBookmarks> = yield select(
        selectSavedBookmarks,
      );

      LayoutAnimation.configureNext(
        {
          duration: 400,
          update: {
            type: LayoutAnimation.Types.easeOut,
            property: LayoutAnimation.Properties.opacity,
          },
          delete: {
            type: LayoutAnimation.Types.easeOut,
            property: LayoutAnimation.Properties.opacity,
          },
        },
        () => {
          if (savedBookmarks?.length === 1) {
            NavigationService.goBack();
          }
        },
      );
    }

    yield put(addToBookmarksSuccess(value));
  } catch (e) {
    yield put(addToBookmarksFailure(e));
  }
}

export function* getSavedBookmarksIdsSaga() {
  try {
    const bookmarksIds: IBookmarksIds | null = yield call(
      getBookmarksFromStorage,
    );

    yield put(getSavedBookmarksIdsSuccess(bookmarksIds));
  } catch (e) {
    yield put(getSavedBookmarksIdsFailure(e));
  }
}

export function* bookmarksSaga() {
  yield takeEvery(
    ACTIONS.GET_OBJECTS_FOR_BOOKMARK_REQUEST,
    getObjectsForBookmarkSaga,
  );

  yield takeEvery(
    ACTIONS.GET_SAVED_BOOKMARKS_IDS_REQUEST,
    getSavedBookmarksIdsSaga,
  );

  yield takeLatest(ACTIONS.ADD_TO_BOOKMARKS_REQUEST, addToBookmarksSaga);
}
