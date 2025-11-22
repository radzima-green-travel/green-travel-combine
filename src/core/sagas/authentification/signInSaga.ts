import { call, put, select, spawn } from 'redux-saga/effects';
import { amplifyApi } from 'api/amplify';
import { createAuthHubChannel } from './createAuthHubChannel';

import { signInRequest } from 'core/actions';
import { CognitoUserWithAttributes, SupportedLocales } from '../../types';
import { socialSignInSaga } from './socialSignInSaga';
import { selectAppLanguage } from 'core/selectors';
import { updateUserAttributesSaga } from './updateUserAttributesSaga';
import { getObjectAttributesSaga } from '../objectAttributes';

export function* signInSaga({
  payload: { email, password, socialProvider },
  meta: { successAction, failureAction },
}: ReturnType<typeof signInRequest>) {
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
        yield spawn(updateUserAttributesSaga, { locale });
      }
      yield call(getObjectAttributesSaga);
    }
    yield put(
      successAction(user?.attributes || null, {
        entityId: socialProvider,
      }),
    );
  } catch (e) {
    yield put(
      failureAction(e as Error, {
        entityId: socialProvider,
      }),
    );
  } finally {
    authChannel.close();
  }
}
