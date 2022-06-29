import {call, put} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {Auth} from 'aws-amplify';
import {signUpRequest, signUpSuccess, signUpFailure} from 'core/reducers';

export function* signUpSaga({payload}: ActionType<typeof signUpRequest>) {
  try {
    yield call([Auth, 'signUp'], payload);

    yield put(signUpSuccess());
  } catch (e) {
    yield put(signUpFailure(e as Error));
  }
}
