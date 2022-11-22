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
import {ILabelError} from 'core/types';
import {resetEtagsStorage} from 'storage';
import {selectAppTheme, selectIsMyProfileFeatureEnabled} from 'core/selectors';
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

      const appThemeSaga: ReturnType<typeof selectAppTheme> = yield select(
        selectAppTheme,
      );

      if (!appThemeSaga) {
        yield put(setDefaultTheme());
      } else {
        yield put(setTheme(appThemeSaga));
      }

      const isLocaledUpdated = yield call(initAppLocaleSaga);

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
