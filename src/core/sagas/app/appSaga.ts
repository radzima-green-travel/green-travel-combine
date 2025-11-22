import { takeLeading } from 'redux-saga/effects';
import { getAppConfigurationRequest } from '../../actions/appConfiguration';
import { getAppConfigurationSaga } from './getAppConfigurationSaga';

export function* appSaga() {
  yield takeLeading(getAppConfigurationRequest, getAppConfigurationSaga);
}
