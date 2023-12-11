import {all} from 'redux-saga/effects';
import {syncAndGetFavoritesSaga} from '../favorites/syncAndGetFavoritesSaga';
import {getVisitedObjectsSaga} from '../visited/getVisitedObjectsSaga';

export function* getObjectAttributesSaga() {
  yield all([syncAndGetFavoritesSaga(), getVisitedObjectsSaga()]);
}
