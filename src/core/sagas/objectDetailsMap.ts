import {call, put, takeEvery} from 'redux-saga/effects';
import {
  showObjectDetailsMapDirectionRequest,
  showObjectDetailsMapDirectionSuccess,
  showObjectDetailsMapDirectionFailure,
} from 'core/reducers';
import {ActionType} from 'typesafe-actions';
import {getDirections} from 'api/mapbox';
import {lineString as makeLineString} from '@turf/helpers';
import {ACTIONS} from 'core/constants';

export function* getDirectionSaga({
  payload,
}: ActionType<typeof showObjectDetailsMapDirectionRequest>) {
  try {
    const data = yield call(getDirections, payload);
    const lineStringGeoJSON: ReturnType<typeof makeLineString> = yield call(
      makeLineString,
      data.routes[0]?.geometry?.coordinates || [],
    );

    const distance = data.routes[0]?.distance
      ? (data.routes[0].distance / 1000).toFixed(1)
      : null;
    yield put(
      showObjectDetailsMapDirectionSuccess({
        direction: lineStringGeoJSON,
        distance: distance,
      }),
    );
  } catch (e) {
    yield put(showObjectDetailsMapDirectionFailure(e));
  }
}

export function* objectDetailsMapSaga() {
  yield takeEvery(
    ACTIONS.SHOW_OBJECT_DETAILS_MAP_DIRECTION_REQUEST,
    getDirectionSaga,
  );
}
