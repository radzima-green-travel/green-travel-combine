import {call, put, select} from 'redux-saga/effects';
import {restAPI} from 'api/rest';
import {ListMobileDataQuery} from 'api/graphql/types';
import {
  getInitialHomeDataSuccess,
  getInitialHomeDataFailure,
} from '../../reducers';
import {saveHomeDataVersionSaga} from './homeDataVersion';
import {ILabelError} from 'core/types';
import {selectAppLanguage} from 'core/selectors';

export function* getInitialHomeDataSaga() {
  try {
    const language = yield select(selectAppLanguage);

    const data: ListMobileDataQuery = yield call(
      [restAPI, restAPI.getAllAppDataFromIndex],
      {
        locale: language,
      },
    );

    yield call(saveHomeDataVersionSaga, data);
    yield put(getInitialHomeDataSuccess({data: data}));
  } catch (e) {
    yield put(getInitialHomeDataFailure(e as ILabelError));
  }
}
