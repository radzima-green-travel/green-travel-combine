import {call, put} from 'redux-saga/effects';

import {clearCacheRequest} from 'core/actions';
import {ILabelError} from 'core/types';
import {Image} from 'expo-image';

export function* clearCacheSaga({
  meta: {successAction, failureAction},
}: ReturnType<typeof clearCacheRequest>) {
  try {
    yield call(Image.clearDiskCache);

    yield put(successAction());
  } catch (e) {
    yield put(failureAction(e as ILabelError));
  }
}
