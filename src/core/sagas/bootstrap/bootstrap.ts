import {call, put, select, spawn, takeEvery} from 'redux-saga/effects';

import {
  bootstrapRequest,
  getAppConfigurationRequest,
  getHomePageDataRequest,
} from 'core/actions';

import {ILabelError} from 'core/types';
import {selectUserAuthorized} from 'core/selectors';
import {initUserAuthSaga} from './initUserAuth';
import {takeEveryMulticast} from '../utils';
import {appStateChannel} from '../channels';
import {listenAppStateChangesSaga} from '../app';
import {getObjectAttributesSaga} from 'core/sagas';
import {initAppLocaleSaga} from './initAppLocaleSaga';

export function* bootstrapSaga() {
  yield takeEvery(
    bootstrapRequest,
    function* ({
      meta: {successAction, failureAction},
    }: ReturnType<typeof bootstrapRequest>) {
      try {
        const isAuthorized = yield select(selectUserAuthorized);

        yield put(getHomePageDataRequest());

        yield call(initUserAuthSaga);
        yield put(getAppConfigurationRequest());

        yield call(initAppLocaleSaga);

        if (isAuthorized) {
          yield spawn(getObjectAttributesSaga);
        }

        yield put(successAction());
      } catch (e) {
        yield put(failureAction(e as ILabelError));
      }
    },
  );

  yield takeEveryMulticast(appStateChannel, listenAppStateChangesSaga);
}
