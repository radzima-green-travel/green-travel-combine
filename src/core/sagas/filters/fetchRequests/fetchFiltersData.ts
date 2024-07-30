import {call} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {FiltersParams, ObjectFiltersDataDTO} from 'core/types';

export function* fetchFiltersData({payload}: {payload: FiltersParams}) {
  const filtersResult: ObjectFiltersDataDTO = yield call(
    [graphQLAPI, graphQLAPI.getFilterObjects],
    payload,
  );

  return filtersResult;
}
