import {call, put, select, takeEvery} from 'redux-saga/effects';

import {
  bootstrapSuccess,
  bootstrapFailure,
  getInitialHomeDataRequest,
  getHomeData,
  getAppConfigurationRequest,
} from 'core/reducers';
import {ACTIONS} from 'core/constants';

import {initAppLocaleSaga} from './initAppLocaleSaga';
import {ILabelError} from 'core/types';
import {
  selectIsMyProfileFeatureEnabled,
  selectUserAuthorized,
} from 'core/selectors';
import {initUserAuthSaga} from './initUserAuth';
import {resetEtags} from 'api/rest/interceptors';
import {syncAndGetFavoritesSaga} from '../favorites/syncAndGetFavoritesSaga';
import {migrateToNewFavoritesTypeSaga} from '../favorites/migrateToNewFavoritesTypeSaga';
import {takeEveryMulticast} from '../utils';
import {appStateChannel} from '../channels';
import {listenAppStateChangesSaga} from '../app';

export function* bootstrapSaga() {
  yield takeEvery(ACTIONS.BOOTSTRAP_REQUEST, function* () {
    try {
      const isMyProfileFeatureEnabled: boolean = yield select(
        selectIsMyProfileFeatureEnabled,
      );
      const isAuthorized = yield select(selectUserAuthorized);

      if (isMyProfileFeatureEnabled) {
        yield call(initUserAuthSaga);
      }
      yield put(getAppConfigurationRequest());

      const isLocaledUpdated = yield call(initAppLocaleSaga);

      if (isLocaledUpdated) {
        yield call(resetEtags);
        yield put(getInitialHomeDataRequest());
      } else {
        yield put(getHomeData());
      }

      yield call(migrateToNewFavoritesTypeSaga);
      if (isAuthorized) {
        yield call(syncAndGetFavoritesSaga);
      }

      yield put(bootstrapSuccess());
    } catch (e) {
      yield put(bootstrapFailure(e as ILabelError));
    }
  });

  yield takeEveryMulticast(appStateChannel, listenAppStateChangesSaga);
}
