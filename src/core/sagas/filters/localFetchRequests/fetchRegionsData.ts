import {RegionsListResponseDTO} from 'core/types';
import {call} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';

export function* fetchRegionsData() {
  const regionsListItems: RegionsListResponseDTO = yield call([
    graphQLAPI,
    graphQLAPI.getRegions,
  ]);

  return regionsListItems;
}
