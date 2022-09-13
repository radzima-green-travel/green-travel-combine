import {call, delay, put, select} from 'redux-saga/effects';

import {getAllAppDataFromIndex} from 'api/rest';
import {ListMobileDataQuery} from 'api/graphql/types';
import {
  getHomeDataUpdatesFailure,
  getHomeDataUpdatesSuccess,
} from '../../reducers';
import {selectHomeUpdatedData} from '../../selectors';

import {languageService} from 'services/LanguageService';
import {ILabelError, SupportedLocales} from 'core/types';
import {saveLocalEtagsToStorage} from 'api/rest/interceptors';

export function* getHomeDataUpdatesSaga() {
  try {
    const currentAppLocale: SupportedLocales = yield call([
      languageService,
      languageService.getCurrentLanguage,
    ]);
    const data: ListMobileDataQuery = yield call(getAllAppDataFromIndex, {
      locale: currentAppLocale,
    });

    const updatedData = yield select(selectHomeUpdatedData);
    if (data) {
      yield put(getHomeDataUpdatesSuccess({data: data}));

      yield call(saveLocalEtagsToStorage);
    } else if (updatedData) {
      yield delay(700);

      yield put(getHomeDataUpdatesSuccess({data: updatedData}));
      yield call(saveLocalEtagsToStorage);
    } else {
      yield delay(700);
      yield put(getHomeDataUpdatesSuccess({data: null}));
    }
  } catch (e) {
    const updatedData = yield select(selectHomeUpdatedData);
    if (updatedData) {
      yield delay(700);

      yield put(getHomeDataUpdatesSuccess({data: updatedData}));
      yield call(saveLocalEtagsToStorage);
    } else {
      yield put(getHomeDataUpdatesFailure(e as ILabelError));
    }
  }
}
