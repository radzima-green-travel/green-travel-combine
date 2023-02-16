import {call, put} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {
  resendSignUpCodeRequest,
  resendSignUpCodeSuccess,
  resendSignUpCodeFailure,
} from 'core/reducers';
import {amplifyApi} from 'api/amplify';

export function* resendSignUpCodeSaga({
  payload,
}: ActionType<typeof resendSignUpCodeRequest>) {
  try {
    yield call(amplifyApi.resendSignUp, payload);

    yield put(resendSignUpCodeSuccess());
  } catch (e) {
    yield put(resendSignUpCodeFailure(e as Error));
  }
}
