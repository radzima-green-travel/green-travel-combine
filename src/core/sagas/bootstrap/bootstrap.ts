import {call, put, takeEvery} from 'redux-saga/effects';

import {
  userAuthorizedRequest,
  getHomeData,
  getInitialHomeDataRequest,
  bootstrapSuccess,
  bootstrapFailure,
} from 'core/reducers';
import {ACTIONS} from 'core/constants';
import {useAuthHubChannel} from 'core/hooks';

import {initAppLocaleSaga} from './initAppLocaleSaga';
import {ILabelError} from 'core/types';

export function* bootstrapSaga() {
  const channel = yield call(useAuthHubChannel);

  yield takeEvery(channel, function* (eventName: string) {
    if (eventName === 'signIn' || eventName === 'signOut') {
      yield put(userAuthorizedRequest());
    }
  });

  yield takeEvery(ACTIONS.BOOTSTRAP_REQUEST, function* () {
    try {
      const isLocaledUpdated = yield call(initAppLocaleSaga);

      if (isLocaledUpdated) {
        yield put(getInitialHomeDataRequest());
      } else {
        yield put(getHomeData());
      }

      yield put(bootstrapSuccess());
    } catch (e) {
      yield put(bootstrapFailure(e as ILabelError));
    }
  });
}
