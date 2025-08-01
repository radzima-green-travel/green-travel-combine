import {all, call, put, select, spawn, takeEvery} from 'redux-saga/effects';

import {
  bootstrapRequest,
  fetchInitialFilters,
  getAppConfigurationRequest,
  getHomePageDataRequest,
} from 'core/actions';

import {ILabelError} from 'core/types';
import {selectUserAuthorized} from 'core/selectors';
import {initUserAuthSaga} from './initUserAuth';
import {takeEveryMulticast} from '../utils';
import {appStateChannel} from '../channels';
import {listenAppStateChangesSaga} from '../app';
import {getObjectAttributesSaga} from '../objectAttributes';
import {initAppLocaleSaga} from './initAppLocaleSaga';

export function* bootstrapSaga() {
  yield takeEvery(
    bootstrapRequest,
    function* ({
      meta: {successAction, failureAction},
    }: ReturnType<typeof bootstrapRequest>) {
      try {
        const isAuthorized = yield select(selectUserAuthorized);

        yield all([
          put(getHomePageDataRequest()),
          call(initAppLocaleSaga),
          call(initUserAuthSaga),
          put(getAppConfigurationRequest()),
          put(fetchInitialFilters()),
        ]);

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
