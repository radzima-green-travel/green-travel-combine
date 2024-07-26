import {call, put, select} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {ListMobileDataQueryObject} from 'api/graphql/types';
import {getObjectDetailsRequest} from 'core/actions';
import {selectAppLanguage} from 'core/selectors';
import {RequestError} from 'core/errors';
import {transformObjectDetails} from 'core/transformators/objectDetails';

export function* getObjectDetailsSaga({
  payload,
  meta: {failureAction, successAction},
}: ReturnType<typeof getObjectDetailsRequest>) {
  try {
    const appLanguage = yield select(selectAppLanguage);

    const response: ListMobileDataQueryObject = yield call(
      [graphQLAPI, graphQLAPI.getObjectDetailsById],
      payload.objectId,
    );

    const objectDetails = transformObjectDetails(response, appLanguage);

    yield put(successAction({objectDetails}));
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
