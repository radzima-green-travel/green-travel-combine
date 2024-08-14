import {call, put, select, spawn, takeEvery} from 'redux-saga/effects';

import {bootstrapSuccess, bootstrapFailure} from 'core/reducers';

import {getAppConfigurationRequest} from '../../actions';
import {ACTIONS} from 'core/constants';

import {ILabelError} from 'core/types';
import {selectUserAuthorized} from 'core/selectors';
import {initUserAuthSaga} from './initUserAuth';
import {takeEveryMulticast} from '../utils';
import {appStateChannel} from '../channels';
import {listenAppStateChangesSaga} from '../app';
import {getObjectAttributesSaga} from '../objectAttributes';
import {getHomePageDataRequest} from 'core/actions';

export function* bootstrapSaga() {
  yield takeEvery(ACTIONS.BOOTSTRAP_REQUEST, function* () {
    try {
      const isAuthorized = yield select(selectUserAuthorized);

      yield put(getHomePageDataRequest());

      yield call(initUserAuthSaga);
      yield put(getAppConfigurationRequest());

      if (isAuthorized) {
        yield spawn(getObjectAttributesSaga);
      }

      yield put(bootstrapSuccess());
    } catch (e) {
      yield put(bootstrapFailure(e as ILabelError));
    }
  });

  yield takeEveryMulticast(appStateChannel, listenAppStateChangesSaga);
}
