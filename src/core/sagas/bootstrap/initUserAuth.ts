import {Auth} from 'aws-amplify';
import {
  setUserAuthData,
  resetUserAuthData,
  clearFavorites,
} from 'core/reducers';
import {selectUserAuthorized} from 'core/selectors';
import {CognitoUserWithAttributes} from 'core/types';
import {call, put, select} from 'redux-saga/effects';

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
    const isAuthorized = yield select(selectUserAuthorized);
    if (isAuthorized) {
      yield put(resetUserAuthData());
      yield put(clearFavorites());
    }

    console.log('error', e);
  }
}
