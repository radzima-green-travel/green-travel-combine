import {call, put, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {amplifyApi} from 'api/amplify';

import {signInRequest, signInSuccess, signInFailure} from 'core/reducers';
import {CognitoUserWithAttributes} from '../../types';
import {selectAppLanguage} from 'core/selectors';
import {Auth} from 'aws-amplify';

export function* signInSaga({
  payload: {email, password},
}: ActionType<typeof signInRequest>) {
  try {
    const locale = yield select(selectAppLanguage);

    const {attributes}: CognitoUserWithAttributes = yield call(
      [amplifyApi, amplifyApi.signIn],
      email,
      password,
    );

    if (attributes.email_verified) {
      const user = yield call([Auth, Auth.currentAuthenticatedUser]);

      yield call([Auth, Auth.updateUserAttributes], user, {
        'custom:locale': locale,
      });
    }

    yield put(signInSuccess({email, userAttributes: attributes}));
  } catch (e) {
    yield put(signInFailure(e as Error));
  }
}
