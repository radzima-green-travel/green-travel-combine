import {call, put} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {amplifyApi} from 'api/amplify';

import {
  socialSignInRequest,
  socialSignInSuccess,
  socialSignInFailure,
} from 'core/reducers';
import {CognitoUserWithAttributes} from 'core/types';

export function* socialSignInSaga({
  payload: provider,
}: ActionType<typeof socialSignInRequest>) {
  try {
    const result: CognitoUserWithAttributes = yield call(
      [amplifyApi, amplifyApi.socialSignIn],
      provider,
    );

    yield put(socialSignInSuccess({userAttributes: result as any}));
  } catch (e) {
    console.log(e);
    yield put(socialSignInFailure(e as Error));
  }
}
