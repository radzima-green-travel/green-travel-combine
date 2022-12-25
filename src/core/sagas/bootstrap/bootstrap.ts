import {call, put, select, takeEvery} from 'redux-saga/effects';

import {
  bootstrapSuccess,
  bootstrapFailure,
  getInitialHomeDataRequest,
  getHomeData,
} from 'core/reducers';
import {ACTIONS} from 'core/constants';

import {initAppLocaleSaga} from './initAppLocaleSaga';
import {ILabelError} from 'core/types';
import {selectIsMyProfileFeatureEnabled} from 'core/selectors';
import {initUserAuthSaga} from './initUserAuth';
import {resetEtags} from 'api/rest/interceptors';

export function* bootstrapSaga() {
  yield takeEvery(ACTIONS.BOOTSTRAP_REQUEST, function* () {
    try {
      const isMyProfileFeatureEnabled: ReturnType<
        typeof selectIsMyProfileFeatureEnabled
      > = yield select(selectIsMyProfileFeatureEnabled);
      if (isMyProfileFeatureEnabled) {
        yield call(initUserAuthSaga);
      }

      const isLocaledUpdated = yield call(initAppLocaleSaga);

      if (isLocaledUpdated) {
        yield call(resetEtags);
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
