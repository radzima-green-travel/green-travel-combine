import {call, put} from 'redux-saga/effects';
import {restAPI} from 'api/rest';
import {ListMobileDataQuery} from 'api/graphql/types';
import {
  getInitialHomeDataSuccess,
  getInitialHomeDataFailure,
} from '../../reducers';
import {saveHomeDataVersionSaga} from './homeDataVersion';
import {languageService} from 'services/LanguageService';
import {ILabelError, SupportedLocales} from 'core/types';

export function* getInitialHomeDataSaga() {
  try {
    const currentAppLocale: SupportedLocales = yield call([
      languageService,
      languageService.getCurrentLanguage,
    ]);
    const data: ListMobileDataQuery = yield call(
      [restAPI, restAPI.getAllAppDataFromIndex],
      {
        locale: currentAppLocale,
      },
    );

    yield call(saveHomeDataVersionSaga, data);
    yield put(getInitialHomeDataSuccess({data: data}));
  } catch (e) {
    yield put(getInitialHomeDataFailure(e as ILabelError));
  }
}
