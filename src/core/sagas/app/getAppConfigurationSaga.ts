import {put, call} from 'redux-saga/effects';
import {
  getAppConfigurationSuccees,
  getAppConfigurationFailure,
} from '../../reducers';
import {restAPI} from 'api/rest';
import {AppConfiguration} from 'core/types';
import {getRegionsList} from 'core/actions';

export function* getAppConfigurationSaga() {
  try {
    const data: AppConfiguration = yield call([
      restAPI,
      restAPI.getAppFeConfiguration,
    ]);

    yield put(getAppConfigurationSuccees(data));
    yield put(getRegionsList());
  } catch (e) {
    yield put(getAppConfigurationFailure(e as Error));
  }
}
