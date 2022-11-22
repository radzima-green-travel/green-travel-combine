import {call, put, select, takeEvery} from 'redux-saga/effects';

import {
  getHomeData,
  getInitialHomeDataRequest,
  bootstrapSuccess,
  bootstrapFailure,
  setTheme,
  setDefaultTheme,
} from 'core/reducers';
import {ACTIONS} from 'core/constants';

import {initAppLocaleSaga} from './initAppLocaleSaga';
import {initAppThemeSaga} from './initAppThemeSaga';
import {ILabelError} from 'core/types';
import {resetEtagsStorage} from 'storage';
import {selectIsMyProfileFeatureEnabled} from 'core/selectors';
import {initUserAuthSaga} from './initUserAuth';

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
      const appThemeSaga = yield call(initAppThemeSaga);

      if (!appThemeSaga) {
        yield put(setDefaultTheme());
      } else {
        yield put(setTheme(appThemeSaga));
      }

      if (isLocaledUpdated) {
        yield call(resetEtagsStorage);
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
