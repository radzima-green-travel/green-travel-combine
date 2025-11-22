import { call, put, select } from 'redux-saga/effects';
import { amplifyApi } from 'api/amplify';
import { signUpRequest } from 'core/actions';
import { selectAppLanguage } from 'core/selectors';

export function* signUpSaga({
  payload,
  meta: { successAction, failureAction },
}: ReturnType<typeof signUpRequest>) {
  try {
    const locale = yield select(selectAppLanguage);

    yield call(amplifyApi.signUp, {
      username: payload.email,
      password: payload.password,
      attributes: {
        email: payload.email,
        name: '',
        family_name: '',
        'custom:locale': locale,
      },
      autoSignIn: {
        enabled: true,
      },
    });

    yield put(successAction(payload.email));
  } catch (e) {
    yield put(failureAction(e as Error));
  }
}
