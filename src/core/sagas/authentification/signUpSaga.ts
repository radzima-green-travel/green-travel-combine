import {call, put, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {Auth} from 'aws-amplify';
import {signUpRequest, signUpSuccess, signUpFailure} from 'core/reducers';
import {selectAppLanguage} from 'core/selectors';

export function* signUpSaga({payload}: ActionType<typeof signUpRequest>) {
  try {
    const locale = yield select(selectAppLanguage);

    yield call([Auth, Auth.signUp], {
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

    yield put(signUpSuccess(payload.email));
  } catch (e) {
    yield put(signUpFailure(e as Error));
  }
}
