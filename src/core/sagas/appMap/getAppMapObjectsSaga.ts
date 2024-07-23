import {call, put, all} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {getAppMapObjectsRequest} from 'core/actions/appMap';
import {RequestError} from 'core/errors';
import {} from 'core/transformators/homePage';
import type {
  AppMapObjectsTotalCountResponseDTO,
  AppMapObjectsResponseDTO,
  ObjectMapDTO,
} from 'core/types/api';

function splitCalls(total: number, limit: number) {
  const fromArray: number[] = [];

  for (let i = 0; i < total; i += limit) {
    fromArray.push(i);
  }

  return fromArray;
}

export function* getAppMapObjectsSaga({
  meta: {successAction, failureAction},
}: ReturnType<typeof getAppMapObjectsRequest>) {
  try {
    const {total}: AppMapObjectsTotalCountResponseDTO = yield call([
      graphQLAPI,
      graphQLAPI.getObjectsTotalCount,
    ]);

    const limit = 100;

    const objectsCalls = splitCalls(total, limit).map(from =>
      call([graphQLAPI, graphQLAPI.getAppMapObjects], {
        from: from,
        limit: limit,
      }),
    );

    const objects: Array<AppMapObjectsResponseDTO> = yield all(objectsCalls);

    const appMapObjects = objects.reduce((acc, {items}) => {
      return [...acc, ...items];
    }, [] as ObjectMapDTO[]);

    yield put(successAction({appMapObjects: appMapObjects}));
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}

// function wrapRequestSaga<T extends (...args: any) => any>(fn: T) {
//   return function* (...args: Parameters<T>) {
//     const {
//       meta: {successAction, failureAction},
//     } = args[0];

//     try {
//       const response = yield call(fn, ...args);

//       yield put(successAction(response));
//     } catch (e) {
//       yield put(failureAction(e));
//     }
//   };
// }
