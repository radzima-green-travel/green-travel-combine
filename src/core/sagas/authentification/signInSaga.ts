import {call, put} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {Auth} from 'aws-amplify';

import {signInRequest, signInSuccess, signInFailure} from 'core/reducers';
import {CognitoUserWithAttributes} from '../../types';

export function* signInSaga({
  payload: {email, password},
}: ActionType<typeof signInRequest>) {
  try {
    const {attributes}: CognitoUserWithAttributes = yield call(
      [Auth, Auth.signIn],
      email,
      password,
    );

    yield put(signInSuccess({email, userAttributes: attributes}));
  } catch (e) {
    console.log(e);
    yield put(signInFailure(e as Error));
  }
}
