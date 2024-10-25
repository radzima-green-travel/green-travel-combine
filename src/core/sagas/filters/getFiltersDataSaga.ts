import {all, call, put} from 'redux-saga/effects';
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

export function* getFiltersDataSaga({
  meta: {failureAction, successAction},
  payload: {filters, query},
}: ReturnType<typeof getFiltersDataRequest>) {
  try {
    const [filtersResult, filtersInitialData]: [
      ObjectFiltersDataDTO,
      {
        regionsList: RegionsListResponseDTO;
        categoriesList: CategoryFilterItemDTO[];
      },
    ] = yield all([
      call([graphQLAPI, graphQLAPI.getFilterObjects], {
        ...transformActiveFiltersToFilterParam(filters),
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
