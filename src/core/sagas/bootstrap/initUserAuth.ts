import {Auth} from 'aws-amplify';
import {setUserAuthData} from 'core/reducers';
import {CognitoUserWithAttributes} from 'core/types';
import {call, put} from 'redux-saga/effects';

export function* initUserAuthSaga() {
  try {
    const {attributes}: CognitoUserWithAttributes = yield call(
      [Auth, Auth.currentAuthenticatedUser],
      {
        bypassCache: true,
      },
    );

    yield put(setUserAuthData(attributes));
  } catch (e) {
    console.log('error', e);
  }
}
