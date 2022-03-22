import {call, put} from 'redux-saga/effects';
import {getAllAppData} from 'api/graphql/methods';
import {ListMobileDataQuery} from 'api/graphql/types';
import {
  getInitialHomeDataSuccess,
  getInitialHomeDataFailure,
} from '../../reducers';
import {saveHomeDataVersionSaga} from './homeDataVersion';
import {languageService} from 'services/LanguageService';
import {SupportedLocales} from 'core/types';

export function* getInitialHomeDataSaga() {
  try {
    const currentAppLocale: SupportedLocales = yield call([
      languageService,
      languageService.getCurrentLanguage,
    ]);
    const data: ListMobileDataQuery = yield call(getAllAppData, {
      locale: currentAppLocale,
    });

    yield call(saveHomeDataVersionSaga, data);
    yield put(getInitialHomeDataSuccess({data: data}));
  } catch (e) {
    yield put(getInitialHomeDataFailure(e));
  }
}
