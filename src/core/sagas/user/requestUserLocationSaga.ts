import {put} from 'redux-saga/effects';
import {requestUserLocation} from 'core/actions';
import {createLocationErrorPreset, RequestError} from 'core/errors';
import {permissionsService} from 'services/PermissionsService';
import * as Location from 'expo-location';

export function* requestUserLocationSaga({
  meta: {successAction, failureAction},
}: ReturnType<typeof requestUserLocation>) {
  try {
    const permissionGranted =
      yield permissionsService.checkLocationPermission();
    if (!permissionGranted) {
      return;
    }
    const {coords} = yield Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Low,
    });
    yield put(successAction({lat: coords.latitude, lon: coords.longitude}));
  } catch (error) {
    yield put(failureAction(new RequestError(createLocationErrorPreset())));
  }
}
