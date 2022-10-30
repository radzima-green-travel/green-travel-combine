import {call, put} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {Auth} from 'aws-amplify';
import {signUpRequest, signUpSuccess, signUpFailure} from 'core/reducers';

export function* signUpSaga({payload}: ActionType<typeof signUpRequest>) {
  try {
    const data = yield call([Auth, Auth.signUp], {
      username: payload.email,
      password: payload.password,
      attributes: {
        email: payload.email,
        name: '',
        family_name: '',
      },
      autoSignIn: {
        enabled: true,
      },
    });

    console.log(data);

    yield put(signUpSuccess(payload.email));
  } catch (e) {
    yield put(signUpFailure(e as Error));
  }
}
