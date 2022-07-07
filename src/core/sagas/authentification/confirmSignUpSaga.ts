import {call, put} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {Auth} from 'aws-amplify';
import {
  confirmSignUpRequest,
  confirmSignUpSuccess,
  confirmSignUpFailure,
} from 'core/reducers';

export function* confirmSignUpSaga({
  payload: {email, code},
}: ActionType<typeof confirmSignUpRequest>) {
  try {
    yield call([Auth, 'confirmSignUp'], email, code);

    yield put(confirmSignUpSuccess());
  } catch (e) {
    yield put(confirmSignUpFailure(e as Error));
  }
}
