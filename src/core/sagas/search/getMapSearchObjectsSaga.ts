import {all, call, put} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {getMapSearchObjectsRequest} from 'core/actions/search';
import {RequestError} from 'core/errors';
import type {MapSearchObjectsDTO, ObjectMapDTO} from 'core/types/api';
import {splitCalls} from '../utils';
import {createSearchPayloadSaga} from './createSearchPayloadSaga';

export function* getMapSearchObjectsSaga({
  payload: {query, filters, options, totals},
  meta: {successAction, failureAction},
}: ReturnType<typeof getMapSearchObjectsRequest>) {
  try {
    const searchPayload = yield call(createSearchPayloadSaga, {
      query,
      filters,
      options,
    });
    const limit = 100;
    const objectsCalls = splitCalls(totals, limit).map(from =>
      call([graphQLAPI, graphQLAPI.getMapSearchObjects], {
        from,
        limit,
        ...searchPayload,
      }),
    );

    const response: MapSearchObjectsDTO[] = yield all(objectsCalls);
    const mapSearchObjects = response.reduce((acc, {items}) => {
      return [...acc, ...items];
    }, [] as ObjectMapDTO[]);
    yield put(successAction({mapSearchObjects: mapSearchObjects}));
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
