import {call, put} from 'redux-saga/effects';

import {
  clearCacheRequestSuccess,
  clearCacheRequestFailure,
} from '../../reducers';
import {ILabelError} from 'core/types';
import {Image} from 'expo-image';

export function* clearCacheSaga() {
  try {
    yield call(Image.clearDiskCache);

    yield put(clearCacheRequestSuccess());
  } catch (e) {
    yield put(clearCacheRequestFailure(e as ILabelError));
  }
}
