import {call, put, select, spawn} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {amplifyApi} from 'api/amplify';

import {signInRequest, signInSuccess, signInFailure} from 'core/reducers';
import {CognitoUserWithAttributes, SupportedLocales} from '../../types';
import {selectAppLanguage} from 'core/selectors';
import {updateUserAttributesSaga} from './updateUserAttributesSaga';

export function* signInSaga({
  payload: {email, password},
}: ActionType<typeof signInRequest>) {
  try {
    const locale: SupportedLocales = yield select(selectAppLanguage);

    const {attributes}: CognitoUserWithAttributes = yield call(
      [amplifyApi, amplifyApi.signIn],
      email,
      password,
    );

    if (attributes.email_verified) {
      yield spawn(updateUserAttributesSaga, {locale});
    }

    yield put(signInSuccess({email, userAttributes: attributes}));
  } catch (e) {
    yield put(signInFailure(e as Error));
  }
}
