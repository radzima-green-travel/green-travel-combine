import {
  addObjectIdToUserSearchHistory,
  deleteAllFromUserSearchHistory,
  deleteObjectIdFromUserSearchHistory,
  addSearchObjectToHistory,
  getSearchObjectsHistoryRequest,
} from 'core/actions';
import {
  selectSearchHistory,
  selectSearchObjectsData,
  selectSearchObjectsTotal,
  selectIsUserHasSavedSearchHistory,
  selectAppLanguage,
  selectSearchObjectsRawData,
  selectSearchQuery,
  selectSearchInputValue,
  selectUserAuthorized,
  selectSearchOptions,
  selectSearchFiltersItems,
} from 'core/selectors';
import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRequestLoading} from 'react-redux-help-kit';
import {useOnRequestError} from './useOnRequestError';
import {useListPagination} from './useListPagination';
import {useSearchSelector} from './useSearchSelector';
import {useSearchActions} from './useSearchActions';
import {find} from 'lodash';
import {INITIAL_FILTERS} from 'core/constants';
import {IState} from 'core/store';
import {useRouter, useNavigation, useLocalSearchParams} from 'expo-router';
import {base64} from 'core/helpers/encodingUtils';
import {RouteQueryParams, SearchFilters} from 'core/types';

export function useSearchList() {
  const dispatch = useDispatch();
  const {setSearchInputValue, searchObjectsRequest, searchMoreObjectsRequest} =
    useSearchActions();

  const isUserHasSavedSearchHistory = useSelector(
    selectIsUserHasSavedSearchHistory,
  );

  const router = useRouter();

  const params = useLocalSearchParams<RouteQueryParams.Search>();

  const filtersToApply = useMemo(
    () =>
      base64(params.filtersToApply).toMaybeObject<SearchFilters>() ?? undefined,
    [params.filtersToApply],
  );

  const historyObjects = useSelector(selectSearchHistory);
  const searchResults = useSearchSelector(selectSearchObjectsData);
  const searchResultsRaw = useSearchSelector(selectSearchObjectsRawData);
  const searchResultsTotal = useSearchSelector(selectSearchObjectsTotal);
  const searchQuery = useSearchSelector(selectSearchQuery);
  const searchOptions = useSearchSelector(selectSearchOptions);
  const inputValue = useSearchSelector(selectSearchInputValue);
  const appLocale = useSelector(selectAppLanguage);
  const isAuthorized = useSelector(selectUserAuthorized);

  const filtersItems = useSelector((state: IState) =>
    selectSearchFiltersItems(state, filtersToApply),
  );
  const {loading} = useRequestLoading(searchObjectsRequest);
  const {errorTexts} = useOnRequestError(searchObjectsRequest, '');
  const {loading: historyLoading} = useRequestLoading(
    getSearchObjectsHistoryRequest,
  );
  const {errorTexts: historyLoadingError} = useOnRequestError(
    getSearchObjectsHistoryRequest,
    '',
  );
  const {loading: nextDataLoading} = useRequestLoading(
    searchMoreObjectsRequest,
  );

  const removeAppliedFilter = useCallback(
    (filterName: string) => {
      if (filtersToApply) {
        router.setParams({
          filtersToApply: base64().from({
            ...filtersToApply,
            [filterName]: INITIAL_FILTERS[filterName],
          }),
        });
      }
    },
    [filtersToApply, router],
  );

  const getSearchObjectsHistory = useCallback(() => {
    dispatch(getSearchObjectsHistoryRequest());
  }, [dispatch]);

  const searchObjects = useCallback(() => {
    dispatch(
      searchObjectsRequest({
        query: searchQuery,
        filters: filtersToApply,
        options: searchOptions,
      }),
    );
  }, [
    dispatch,
    filtersToApply,
    searchObjectsRequest,
    searchQuery,
    searchOptions,
  ]);

  const searchMoreObjects = useCallback(() => {
    dispatch(
      searchMoreObjectsRequest({
        query: searchQuery,
        filters: filtersToApply,
        options: searchOptions,
      }),
    );
  }, [
    dispatch,
    filtersToApply,
    searchQuery,
    searchMoreObjectsRequest,
    searchOptions,
  ]);

  const isSearchEmpty = !searchQuery.length;
  const isFiltersEmpty = !filtersToApply;

  const isHistoryVisible =
    isUserHasSavedSearchHistory && isFiltersEmpty && isSearchEmpty;

  const isSearchPreviewVisible =
    !isHistoryVisible && isSearchEmpty && isFiltersEmpty;

  const data = isHistoryVisible ? historyObjects : searchResults;

  const needToLoadHistory =
    isUserHasSavedSearchHistory && !historyObjects.length;

  useEffect(() => {
    if (needToLoadHistory) {
      getSearchObjectsHistory();
    }
  }, [dispatch, needToLoadHistory, getSearchObjectsHistory]);

  const listPaninationProps = useListPagination({
    isLoading: nextDataLoading,
    loadMore: searchMoreObjects,
    hasMoreToLoad: !loading && searchResults.length < searchResultsTotal,
  });

  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.isFocused()) {
      searchObjects();
    }
  }, [
    searchObjects,
    appLocale,
    isAuthorized,
    navigation.isFocused,
    navigation,
  ]);

  const addToHistory = useCallback(
    (id: string) => {
      const rawObject = find(searchResultsRaw, {id: id});
      dispatch(addObjectIdToUserSearchHistory(id));
      if (rawObject) {
        dispatch(addSearchObjectToHistory({searchObject: rawObject}));
      }
    },
    [dispatch, searchResultsRaw],
  );

  const deleteFromHistory = useCallback(
    (objectId: string) => {
      dispatch(deleteObjectIdFromUserSearchHistory(objectId));
    },
    [dispatch],
  );

  const deleteAllFromHistory = useCallback(() => {
    dispatch(deleteAllFromUserSearchHistory());
  }, [dispatch]);

  const clearInput = useCallback(() => {
    dispatch(setSearchInputValue(''));
  }, [dispatch, setSearchInputValue]);

  const onTextChange = useCallback(
    (value: string) => {
      dispatch(setSearchInputValue(value));
    },
    [dispatch, setSearchInputValue],
  );

  const retryCallback = useCallback(() => {
    searchObjects();
  }, [searchObjects]);

  return {
    isHistoryVisible,
    data,
    addToHistory,
    deleteFromHistory,
    deleteAllFromHistory,
    clearInput,
    onTextChange,
    inputValue,
    listPaninationProps,
    isSearchPreviewVisible,
    searchSuspenseProps: {
      loading: loading,
      error: errorTexts,
      retryCallback: retryCallback,
    },
    searchHistorySuspenseProps: {
      loading: historyLoading,
      error: historyLoadingError,
      retryCallback: getSearchObjectsHistory,
    },
    totalResults: searchResultsTotal,
    removeAppliedFilter,
    filtersItems,
    isSearchEmpty,
    isFiltersEmpty,
  };
}
