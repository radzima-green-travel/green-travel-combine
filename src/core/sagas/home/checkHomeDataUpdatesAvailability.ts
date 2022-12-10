import {call, put} from 'redux-saga/effects';
import {ListMobileDataQuery} from 'api/graphql/types';
import {
  getHomeDataUpdateAvailableFailure,
  getHomeDataUpdateAvailableSuccess,
  getHomeDataUpdatesRequest,
  getInitialHomeDataRequest,
} from '../../reducers';
import {loadingSaga} from '../loading';
import {languageService} from 'services/LanguageService';
import {ILabelError, SupportedLocales} from 'core/types';
import {restAPI} from 'api/rest';

export function* checkHomeDataUpdatesAvailabilitySaga() {
  try {
    const currentAppLocale: SupportedLocales = yield call([
      languageService,
      languageService.getCurrentLanguage,
    ]);

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
          locale: currentAppLocale,
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
