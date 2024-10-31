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
} from 'core/selectors';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRequestLoading, useUpdateEffect} from 'react-redux-help-kit';
import {useOnRequestError} from './useOnRequestError';
import {useListPagination} from './useListPagination';
import {useSearchSelector} from './useSearchSelector';
import {useSearchActions} from './useSearchActions';
import {useRoute} from '@react-navigation/native';
import {SearchScreenRouteProps} from '../../screens/Search/types';
import {find} from 'lodash';

export function useSearchList() {
  const dispatch = useDispatch();
  const {setSearchInputValue, searchObjectsRequest, searchMoreObjectsRequest} =
    useSearchActions();

  const isUserHasSavedSearchHistory = useSelector(
    selectIsUserHasSavedSearchHistory,
  );

  const {params} = useRoute<SearchScreenRouteProps>();

  const {filtersToApply} = params || {};

  const historyObjects = useSelector(selectSearchHistory);
  const searchResults = useSearchSelector(selectSearchObjectsData);
  const searchResultsRaw = useSearchSelector(selectSearchObjectsRawData);
  const searchResultsTotal = useSearchSelector(selectSearchObjectsTotal);
  const searchQuery = useSearchSelector(selectSearchQuery);
  const inputValue = useSearchSelector(selectSearchInputValue);
  const appLocale = useSearchSelector(selectAppLanguage);
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

  const getSearchObjectsHistory = useCallback(() => {
    dispatch(getSearchObjectsHistoryRequest());
  }, [dispatch]);

  const searchObjects = useCallback(() => {
    dispatch(
      searchObjectsRequest({query: searchQuery, filters: filtersToApply}),
    );
  }, [dispatch, filtersToApply, searchObjectsRequest, searchQuery]);

  const searchMoreObjects = useCallback(() => {
    dispatch(
      searchMoreObjectsRequest({query: searchQuery, filters: filtersToApply}),
    );
  }, [dispatch, filtersToApply, searchQuery, searchMoreObjectsRequest]);

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

  useUpdateEffect(() => {
    searchObjects();
  }, [searchObjects, appLocale]);

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
  };
}
