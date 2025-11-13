import { call, put, takeEvery } from 'redux-saga/effects';
import { showObjectDetailsMapDirectionRequest } from 'core/actions';
import { mapBoxApi } from 'api/mapbox';
import { lineString as makeLineString } from '@turf/helpers';
import { ILabelError } from 'core/types';

export function* getDirectionSaga({
  payload,
  meta: { successAction, failureAction },
}: ReturnType<typeof showObjectDetailsMapDirectionRequest>) {
  try {
    const data = yield call([mapBoxApi, mapBoxApi.getDirections], payload);
    const lineStringGeoJSON: ReturnType<typeof makeLineString> = yield call(
      makeLineString,
      data.routes[0]?.geometry?.coordinates || [],
    );

    const distance = data.routes[0]?.distance
      ? (data.routes[0].distance / 1000).toFixed(1)
      : null;
    yield put(
      successAction({
        direction: lineStringGeoJSON,
        distance: distance,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as ILabelError));
  }
}

export function* objectDetailsMapSaga() {
  yield takeEvery(showObjectDetailsMapDirectionRequest, getDirectionSaga);
}
