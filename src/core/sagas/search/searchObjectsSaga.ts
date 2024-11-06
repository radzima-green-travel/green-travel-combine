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
import {selectAppLanguage, selectUserAuthorizedData} from 'core/selectors';
import {DEFAULT_LOCALE} from 'core/constants';
import {transformSearchOptionsToFieldsToSearch} from 'core/transformators/search';

export function* searchObjectsSaga({
  payload: {query, filters, options},
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

    if (!query.length && !filters) {
      yield put(
        successAction({
          searchObjects: [],
          nextToken: null,
          total: 0,
          highlight: null,
        }),
      );
      return;
    }

    const appLocale: ReturnType<typeof selectAppLanguage> =
      yield select(selectAppLanguage);

    if (!isLoadingMoreAction) {
      yield delay(300);
    }

    const userData: ReturnType<typeof selectUserAuthorizedData> = yield select(
      selectUserAuthorizedData,
    );

    const {items, nextToken, total, highlight}: SearchObjectsResponseDTO =
      yield call([graphQLAPI, graphQLAPI.getSearchObjects], {
        query: query,
        nextToken: isLoadingMoreAction ? prevToken : null,
        locale:
          !appLocale || appLocale === DEFAULT_LOCALE ? undefined : appLocale,
        ...transformSearchOptionsToFieldsToSearch(options),
        ...(filters
          ? transformActiveFiltersToFilterParam({
              filters,
              userId: userData?.sub,
            })
          : {}),
      });

    yield put(
      successAction({searchObjects: items, nextToken, total, highlight}),
    );
  } catch (e) {
    yield put(failureAction(e as RequestError));
  }
}
