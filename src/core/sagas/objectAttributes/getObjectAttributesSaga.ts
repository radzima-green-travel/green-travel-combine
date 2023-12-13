import {all, put, select} from 'redux-saga/effects';
import {syncAndGetFavoritesSaga} from '../favorites/syncAndGetFavoritesSaga';
import {getVisitedObjectsSaga} from '../visitedObjects/getVisitedObjectsSaga';
import {selectPreparedVisitedObject} from 'core/selectors';
import {addVisitedObjectRequest} from 'core/reducers';

export function* getObjectAttributesSaga() {
  const preparedVisitedObject = yield select(selectPreparedVisitedObject);

  yield all([syncAndGetFavoritesSaga(), getVisitedObjectsSaga()]);

  if (preparedVisitedObject) {
    yield put(addVisitedObjectRequest(preparedVisitedObject));
  }
}
