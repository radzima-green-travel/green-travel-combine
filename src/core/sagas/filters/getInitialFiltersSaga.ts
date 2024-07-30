import {put, all, call, select} from 'redux-saga/effects';
import {RequestError} from 'core/errors';
import {fetchCategorieData} from './fetchRequests/fetchCategorieData';
import {fetchRegionsData} from './fetchRequests/fetchRegionsData';
import {fetchFiltersData} from './fetchRequests/fetchFiltersData';
import {selectFilters} from 'core/selectors';
import {getInitialFilters} from 'core/actions';

export function* getInitialFiltersSaga({
  meta: {failureAction, successAction},
}: ReturnType<typeof getInitialFilters>) {
  try {
    const {
      filtersData: filtersDataStore,
      regionsList: regionsListStore,
      categoriesData: categoriesDataStore,
    } = yield select(selectFilters);

    const [categoriesData, regionsList, filtersData] = yield all([
      !categoriesDataStore.categoriesList?.length && call(fetchCategorieData),
      !regionsListStore.length && call(fetchRegionsData),
      !filtersDataStore && call(fetchFiltersData, {payload: {}}),
    ]);

    yield put(
      successAction({
        filtersData: filtersDataStore || filtersData,
        regionsList: regionsListStore.length ? regionsListStore : regionsList,
        categoriesData: categoriesDataStore.categoriesList?.length
          ? categoriesDataStore
          : categoriesData,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
