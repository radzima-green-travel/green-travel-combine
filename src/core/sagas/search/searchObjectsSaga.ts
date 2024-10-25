import {call, delay, put, select} from 'redux-saga/effects';
import {graphQLAPI} from 'api/graphql';
import {
  searchObjectsRequest,
  searchMoreObjectsRequest,
} from 'core/actions/search';
import {selectSearchNextToken} from 'core/selectors/search';
import {RequestError} from 'core/errors';
import type {SearchObjectsResponseDTO} from 'core/types/api';
import {transformActiveFiltersToFilterParam} from 'core/transformators/filters';
import {selectAppLanguage} from 'core/selectors';
import {DEFAULT_LOCALE} from 'core/constants';

export function* searchObjectsSaga({
  payload: {query, filters},
  type,
  meta: {successAction, failureAction, reducerId},
}:
  | ReturnType<typeof searchObjectsRequest>
  | ReturnType<typeof searchMoreObjectsRequest>) {
  try {
    const isLoadingMoreAction = type === searchMoreObjectsRequest.type;
    const prevToken: ReturnType<typeof selectSearchNextToken> = yield select(
      selectSearchNextToken,
      reducerId || '',
    );

    const appLocale: ReturnType<typeof selectAppLanguage> =
      yield select(selectAppLanguage);

    if (!isLoadingMoreAction) {
      yield delay(300);
    }

    const {items, nextToken, total, highlight}: SearchObjectsResponseDTO =
      yield call([graphQLAPI, graphQLAPI.getSearchObjects], {
        query,
        nextToken: isLoadingMoreAction ? prevToken : null,
        locale:
          !appLocale || appLocale === DEFAULT_LOCALE ? undefined : appLocale,
        ...(filters ? transformActiveFiltersToFilterParam(filters) : {}),
      });

    yield put(
      successAction({searchObjects: items, nextToken, total, highlight}),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
