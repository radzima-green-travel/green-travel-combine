import {call, put} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {Auth} from 'aws-amplify';
import {
  resendSignUpCodeRequest,
  resendSignUpCodeSuccess,
  resendSignUpCodeFailure,
} from 'core/reducers';

export function* resendSignUpCodeSaga({
  payload,
}: ActionType<typeof resendSignUpCodeRequest>) {
  try {
    yield call([Auth, 'resendSignUp'], payload);

    yield put(resendSignUpCodeSuccess());
  } catch (e) {
    yield put(resendSignUpCodeFailure(e as Error));
  }
}
