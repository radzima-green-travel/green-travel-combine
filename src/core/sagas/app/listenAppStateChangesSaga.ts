import {
  getHomeDataUpdateAvailableRequest,
  syncAndGetFavoritesRequst,
} from 'core/reducers';
import {selectUserAuthorized} from 'core/selectors';
import {AppStateStatus} from 'react-native';
import {put, select} from 'redux-saga/effects';

export function* listenAppStateChangesSaga({
  state,
  prevSate,
}: {
  state: AppStateStatus;
  prevSate: AppStateStatus;
}) {
  const isAuthorized = yield select(selectUserAuthorized);
  if (state === 'active' && prevSate === 'background') {
    yield put(getHomeDataUpdateAvailableRequest());
    if (isAuthorized) {
      yield put(syncAndGetFavoritesRequst());
    }
  }
}
