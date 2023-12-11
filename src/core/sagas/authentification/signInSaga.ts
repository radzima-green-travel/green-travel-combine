import {call, put, select, spawn} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {amplifyApi} from 'api/amplify';
import {createAuthHubChannel} from './createAuthHubChannel';

import {signInRequest, signInSuccess, signInFailure} from 'core/reducers';
import {CognitoUserWithAttributes, SupportedLocales} from '../../types';
import {socialSignInSaga} from './socialSignInSaga';
import {selectAppLanguage} from 'core/selectors';
import {updateUserAttributesSaga} from './updateUserAttributesSaga';
import {getObjectAttributesSaga} from '../objectDetails';

export function* signInSaga({
  payload: {email, password, socialProvider},
}: ActionType<typeof signInRequest>) {
  const authChannel = createAuthHubChannel();
  try {
    let user: CognitoUserWithAttributes | null = null;

    if (email && password) {
      user = yield call([amplifyApi, amplifyApi.signIn], email, password);
    } else if (socialProvider) {
      user = yield call(socialSignInSaga, {
        provider: socialProvider,
        authChannel: authChannel,
      });
    }
    if (user) {
      const locale: SupportedLocales = yield select(selectAppLanguage);
      if (user.attributes.email_verified) {
        yield spawn(updateUserAttributesSaga, {locale});
      }
      yield call(getObjectAttributesSaga);
    }
    yield put(
      signInSuccess(user?.attributes || null, {entityId: socialProvider}),
    );
  } catch (e) {
    yield put(signInFailure(e as Error, {entityId: socialProvider}));
  } finally {
    authChannel.close();
  }
}
