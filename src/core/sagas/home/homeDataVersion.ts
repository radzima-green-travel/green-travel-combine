import {call} from 'redux-saga/effects';
import {ListMobileDataQuery} from 'api/graphql/types';
import {ListMobileMetadata} from 'api/graphql/customTypes';
import {find} from 'lodash';
import {
  setAllAppDataVersionToStorage,
  getAllAppDataVersionFromStorage,
} from 'storage';

export function* saveHomeDataVersionSaga(data: ListMobileDataQuery) {
  const version = find(
    data.listMobileData?.metadata,
    meta => meta?.id === 'version',
  )?.value;

  if (version) {
    yield call(setAllAppDataVersionToStorage, version);
  }
}

export function* checkIfHomeDataVersionChanged(data: ListMobileMetadata) {
  const version = find(
    data.listMobileData?.metadata,
    meta => meta?.id === 'version',
  )?.value;

  const prevVersion = yield call(getAllAppDataVersionFromStorage);
  return version && prevVersion && version !== prevVersion;
}
