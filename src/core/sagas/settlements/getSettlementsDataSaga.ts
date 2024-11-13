import {SettlementsResponseDTO, SpotItemDTO} from './../../types/api/graphql';
import {call, put, all} from 'redux-saga/effects';
import {getSettlementsDataRequest} from 'core/actions';
import {graphQLAPI} from 'api/graphql';
import {RequestError} from 'core/errors';

function splitCalls(total: number, limit: number) {
  const fromArray: number[] = [];

  for (let i = 0; i < total; i += limit) {
    fromArray.push(i);
  }

  return fromArray;
}

export function* getSettlementsDataSaga({
  meta: {failureAction, successAction},
}: ReturnType<typeof getSettlementsDataRequest>) {
  try {
    const {total}: SettlementsResponseDTO = yield call([
      graphQLAPI,
      graphQLAPI.getSettlements,
    ]);

    const limit = 100;

    const objectsCalls = splitCalls(total, limit).map(from =>
      call([graphQLAPI, graphQLAPI.getSettlements], {
        from: from,
        limit: limit,
        sort: {
          field: 'value',
          direction: 'asc',
        },
      }),
    );
    const response: SettlementsResponseDTO[] = yield all(objectsCalls);

    const data = response.reduce((acc, {items}) => {
      return [...acc, ...items];
    }, [] as Array<SpotItemDTO>);

    yield put(successAction(data));
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
