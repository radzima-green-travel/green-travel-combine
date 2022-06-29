import {call, put} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {Auth} from 'aws-amplify';
import {signInRequest, signInSuccess, signInFailure} from 'core/reducers';

export function* signInSaga({
  payload: {email, password},
}: ActionType<typeof signInRequest>) {
  try {
    yield call([Auth, 'signIn'], email, password);

    yield put(signInSuccess({email}));
  } catch (e) {
    yield put(signInFailure(e as Error));
  }
}
