import {call, put} from 'redux-saga/effects';
import {getAllAppMetadata, getAllAppData} from 'api/graphql/methods';
import {ListMobileDataQuery} from 'api/graphql/types';
import {ListMobileMetadata} from 'api/graphql/customTypes';
import {
  getHomeDataUpdateAvailableFailure,
  getHomeDataUpdateAvailableSuccess,
  getHomeDataUpdatesRequest,
  getInitialHomeDataRequest,
} from '../../reducers';
import {loadingSaga} from '../loading';
import {checkIfHomeDataVersionChanged} from './homeDataVersion';

export function* checkHomeDataUpdatesAvailabilitySaga() {
  try {
    const updateDataLoading = yield call(
      loadingSaga,
      getHomeDataUpdatesRequest,
    );
    const getInitialDataLoading = yield call(
      loadingSaga,
      getInitialHomeDataRequest,
    );

    const loading = updateDataLoading || getInitialDataLoading;

    let updatedData: ListMobileDataQuery | null = null;
    if (!loading) {
      const {data}: {data: ListMobileMetadata} = yield call(getAllAppMetadata);
      const isHomeDataVersionChanged = yield call(
        checkIfHomeDataVersionChanged,
        data,
      );

      if (isHomeDataVersionChanged) {
        const {data}: {data: ListMobileDataQuery} = yield call(getAllAppData);
        updatedData = data;
      }
    }

    yield put(
      getHomeDataUpdateAvailableSuccess({
        updatedData: updatedData,
      }),
    );
  } catch (e) {
    yield put(getHomeDataUpdateAvailableFailure(e));
  }
}
