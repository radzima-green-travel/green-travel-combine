import {call, put} from 'redux-saga/effects';
import {resendSignUpCodeRequest} from 'core/actions';
import {amplifyApi} from 'api/amplify';

export function* resendSignUpCodeSaga({
  payload,
  meta: {successAction, failureAction},
}: ReturnType<typeof resendSignUpCodeRequest>) {
  try {
    yield call(amplifyApi.resendSignUp, payload);

    yield put(successAction());
  } catch (e) {
    yield put(failureAction(e as Error));
  }
}
