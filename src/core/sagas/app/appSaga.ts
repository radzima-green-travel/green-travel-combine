import {ACTIONS} from 'core/constants';
import {takeLeading} from 'redux-saga/effects';
import {getAppConfigurationSaga} from './getAppConfigurationSaga';

export function* appSaga() {
  yield takeLeading(
    ACTIONS.GET_APP_CONFIGURATION_REQUEST,
    getAppConfigurationSaga,
  );
}
