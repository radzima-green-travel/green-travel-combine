import {all, call, put, select} from 'redux-saga/effects';
import {
  CategoryFilterItemDTO,
  ObjectFiltersDataDTO,
  RegionsListResponseDTO,
} from 'core/types';
import {RequestError} from 'core/errors';
import {graphQLAPI} from 'api/graphql';
import {getFiltersDataRequest} from 'core/actions';
import {transformActiveFiltersToFilterParam} from 'core/transformators/filters';
import {getInitialFiltersSaga} from './getInitialFiltersSaga';
import {selectUserAuthorizedData} from 'core/selectors';
import {transformSearchOptionsToFieldsToSearch} from 'core/transformators/search';

export function* getFiltersDataSaga({
  meta: {failureAction, successAction},
  payload: {filters, query, options},
}: ReturnType<typeof getFiltersDataRequest>) {
  try {
    const userData: ReturnType<typeof selectUserAuthorizedData> = yield select(
      selectUserAuthorizedData,
    );

    const [filtersResult, filtersInitialData]: [
      ObjectFiltersDataDTO,
      {
        regionsList: RegionsListResponseDTO;
        categoriesList: CategoryFilterItemDTO[];
      },
    ] = yield all([
      call([graphQLAPI, graphQLAPI.getFilterObjects], {
        ...(options ? transformSearchOptionsToFieldsToSearch(options) : {}),
        ...transformActiveFiltersToFilterParam({
          filters,
          userId: userData?.sub,
        }),
        query,
      }),
      call(getInitialFiltersSaga),
    ]);

    yield put(
      successAction({
        filtersData: filtersResult,
        regionsList: filtersInitialData.regionsList,
        categoriesList: filtersInitialData.categoriesList,
      }),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
