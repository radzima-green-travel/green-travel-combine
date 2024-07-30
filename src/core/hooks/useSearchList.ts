import {
  setSearchInputValue,
  searchObjectsRequest,
  getSearchObjectsHistoryRequest,
  searchMoreObjectsRequest,
  addSearchObjectToHistory,
} from 'core/actions/search';

import {
  addObjectIdToUserSearchHistory,
  deleteAllFromUserSearchHistory,
  deleteObjectIdFromUserSearchHistory,
} from 'core/actions';
import {
  selectSearchHistory,
  selectSearchInputValue,
  selectSearchObjectsData,
  selectSearchResultsWithLocation,
  selectSearchHistoryWithLocation,
  selectSearchObjectsTotal,
  selectSearchHistoryObjectsIds,
} from 'core/selectors';
import {SearchObject} from 'core/types';
import {debounce} from 'lodash';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  useRequestLoading,
  useStaticCallback,
  useUpdateEffect,
} from 'react-redux-help-kit';
import {useOnRequestError} from './useOnRequestError';
import {useListPagination} from './useListPagination';

export function useSearchList({
  withLocation = false,
}: {withLocation?: boolean} = {}) {
  const dispatch = useDispatch();
  const historyObjectsIds = useSelector(selectSearchHistoryObjectsIds);
  const historyObjects = useSelector(
    withLocation ? selectSearchHistoryWithLocation : selectSearchHistory,
  );

  const searchResults = useSelector(
    withLocation ? selectSearchResultsWithLocation : selectSearchObjectsData,
  );

  const searchResultsTotal = useSelector(selectSearchObjectsTotal);
  const inputValue = useSelector(selectSearchInputValue);

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

  const searchObjects = useCallback(
    (query: string) => {
      dispatch(searchObjectsRequest({query: query}));
    },
    [dispatch],
  );

  const searchMoreObjects = useCallback(() => {
    dispatch(searchMoreObjectsRequest({query: inputValue}));
  }, [dispatch, inputValue]);

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const isSearchEmpty = inputValue === '';

  const setIsFirstLoadFalse = useStaticCallback(() => {
    if (!isSearchEmpty) {
      setIsFirstLoad(false);
    }
  }, [isSearchEmpty]);

  useUpdateEffect(() => {
    if (loading === false) {
      setIsFirstLoadFalse();
    }
  }, [loading, setIsFirstLoadFalse]);

  useEffect(() => {
    if (isSearchEmpty) {
      setIsFirstLoad(true);
    }
  }, [isSearchEmpty]);

  const isHistoryVisible = isSearchEmpty || isFirstLoad;

  const data = isHistoryVisible ? historyObjects : searchResults;

  const needToLoadHistory =
    Boolean(historyObjectsIds.length) && !historyObjects.length;

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

  const searchObjectsDebounce = useMemo(
    () => debounce(searchObjects, 350, {trailing: true, leading: false}),
    [searchObjects],
  );

  useUpdateEffect(() => {
    searchObjectsDebounce(inputValue);
  }, [searchObjectsDebounce, inputValue]);

  const addToHistory = useCallback(
    (object: SearchObject) => {
      dispatch(addObjectIdToUserSearchHistory(object.id));
      dispatch(addSearchObjectToHistory({searchObject: object}));
    },
    [dispatch],
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
  }, [dispatch]);

  const onTextChange = useCallback(
    (value: string) => {
      dispatch(setSearchInputValue(value));
    },
    [dispatch],
  );

  const retryCallback = useCallback(() => {
    searchObjects(inputValue);
  }, [inputValue, searchObjects]);

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
    isFirstLoad,
    isSearchPreviewVisible: isSearchEmpty || isFirstLoad,
    searchSuspenseProps: {
      loading,
      error: errorTexts,
      retryCallback: retryCallback,
    },
    searchHistorySuspenseProps: {
      loading: historyLoading,
      error: historyLoadingError,
      retryCallback: getSearchObjectsHistory,
    },
  };
}
