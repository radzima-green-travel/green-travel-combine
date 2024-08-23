import {call, put} from 'redux-saga/effects';
import {ObjectFiltersDataDTO, ActiveFilters} from 'core/types';
import {RequestError} from 'core/errors';
import {graphQLAPI} from 'api/graphql';
import {getFiltersDataRequest} from 'core/actions';
import {prepareAggregationsWithNumberOfItems} from 'core/transformators/filters';

export function* getFiltersDataSaga({
  meta: {failureAction, successAction},
  payload,
}: ReturnType<typeof getFiltersDataRequest>) {
  try {
    const filtersResult: ObjectFiltersDataDTO = yield call(
      [graphQLAPI, graphQLAPI.getFilterObjects],
      payload,
    );

    const {settlementsWithNumberOfItems} = prepareAggregationsWithNumberOfItems(
      filtersResult.aggregations,
    );

    const municipalities = payload.filter?.municipalities || [];
    const updatedMunicipalities = municipalities.filter(
      item => settlementsWithNumberOfItems[item],
    );
    const activeFilters = {
      ...payload.filter,
      municipalities: updatedMunicipalities,
    } as ActiveFilters;

    if (JSON.stringify(activeFilters) === JSON.stringify(payload.filter)) {
      yield put(successAction({filtersResult}));
      return;
    }

    yield put(successAction({filtersResult, activeFilters}));
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
