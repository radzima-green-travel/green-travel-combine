import {select} from 'redux-saga/effects';

import {transformActiveFiltersToFilterParam} from 'core/transformators/filters';
import {selectAppLanguage, selectUserAuthorizedData} from 'core/selectors';
import {DEFAULT_LOCALE} from 'core/constants';
import {transformSearchOptionsToFieldsToSearch} from 'core/transformators/search';
import {SearchObjectsRequestPayload} from 'core/actions';

export function* createSearchPayloadSaga({
  query,
  filters,
  options,
}: SearchObjectsRequestPayload) {
  const appLocale: ReturnType<typeof selectAppLanguage> =
    yield select(selectAppLanguage);

  const userData: ReturnType<typeof selectUserAuthorizedData> = yield select(
    selectUserAuthorizedData,
  );

  return {
    query: query,
    locale: !appLocale || appLocale === DEFAULT_LOCALE ? undefined : appLocale,
    ...(options ? transformSearchOptionsToFieldsToSearch(options) : {}),
    ...(filters
      ? transformActiveFiltersToFilterParam({
          filters,
          userId: userData?.sub,
        })
      : {}),
  };
}
