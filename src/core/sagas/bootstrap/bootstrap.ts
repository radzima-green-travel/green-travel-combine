import {call, put, select, all, spawn, takeEvery} from 'redux-saga/effects';

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
import {migrateToNewFavoritesTypeSaga} from '../favorites/migrateToNewFavoritesTypeSaga';
import {takeEveryMulticast} from '../utils';
import {appStateChannel} from '../channels';
import {listenAppStateChangesSaga} from '../app';
import {getObjectAttributesSaga} from '../objectAttributes';
import {
  getHomePageDataRequest,
  getRegionsList,
  getFiltersCategories,
} from 'core/actions';

export function* bootstrapSaga() {
  yield takeEvery(ACTIONS.BOOTSTRAP_REQUEST, function* () {
    try {
      const isMyProfileFeatureEnabled: boolean = yield select(
        selectIsMyProfileFeatureEnabled,
      );
      const isAuthorized = yield select(selectUserAuthorized);

      yield put(getHomePageDataRequest());

      yield all([
        yield put(getRegionsList()),
        yield put(getFiltersCategories()),
      ]);

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
        yield spawn(getObjectAttributesSaga);
      }

      yield put(bootstrapSuccess());
    } catch (e) {
      yield put(bootstrapFailure(e as ILabelError));
    }
  });

  yield takeEveryMulticast(appStateChannel, listenAppStateChangesSaga);
}
