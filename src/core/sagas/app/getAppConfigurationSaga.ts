import { put, call } from 'redux-saga/effects';
import { getAppConfigurationRequest } from '../../actions/appConfiguration';
import { restAPI } from 'api/rest';
import { AppConfiguration } from 'core/types';
import { RequestError } from 'core/errors';

export function* getAppConfigurationSaga({
  meta: { successAction, failureAction },
}: ReturnType<typeof getAppConfigurationRequest>) {
  try {
    const data: AppConfiguration = yield call([
      restAPI,
      restAPI.getAppFeConfiguration,
    ]);

    yield put(successAction(data));
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
