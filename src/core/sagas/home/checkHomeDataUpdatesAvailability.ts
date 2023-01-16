import {call, put, select} from 'redux-saga/effects';
import {ListMobileDataQuery} from 'api/graphql/types';
import {
  getHomeDataUpdateAvailableFailure,
  getHomeDataUpdateAvailableSuccess,
  getHomeDataUpdatesRequest,
  getInitialHomeDataRequest,
} from '../../reducers';
import {loadingSaga} from '../loading';
import {ILabelError} from 'core/types';
import {restAPI} from 'api/rest';
import {selectAppLanguage} from 'core/selectors';

export function* checkHomeDataUpdatesAvailabilitySaga() {
  try {
    const language = yield select(selectAppLanguage);

    const updateDataLoading = yield call(
      loadingSaga,
      getHomeDataUpdatesRequest,
    );
    const getInitialDataLoading = yield call(
      loadingSaga,
      getInitialHomeDataRequest,
    );

    const loading = updateDataLoading || getInitialDataLoading;

    const data: ListMobileDataQuery | null = loading
      ? null
      : yield call([restAPI, restAPI.getAllAppDataFromIndex], {
          locale: language,
        });

    yield put(
      getHomeDataUpdateAvailableSuccess({
        updatedData: data,
      }),
    );
  } catch (e) {
    yield put(getHomeDataUpdateAvailableFailure(e as ILabelError));
  }
}
