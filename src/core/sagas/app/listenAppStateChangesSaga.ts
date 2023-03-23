import {
  getHomeDataUpdateAvailableRequest,
  syncAndGetFavoritesRequst,
} from 'core/reducers';
import {AppStateStatus} from 'react-native';
import {put} from 'redux-saga/effects';

export function* listenAppStateChangesSaga({
  state,
  prevSate,
}: {
  state: AppStateStatus;
  prevSate: AppStateStatus;
}) {
  if (state === 'active' && prevSate === 'background') {
    yield put(getHomeDataUpdateAvailableRequest());
    yield put(syncAndGetFavoritesRequst());
  }
}
