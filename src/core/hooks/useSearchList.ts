import {
  addObjectIdToUserSearchHistory,
  deleteAllFromUserSearchHistory,
  deleteObjectIdFromUserSearchHistory,
} from 'core/actions';
import {
  selectSearchHistory,
  selectSearchInputValue,
  selectSearchObjectsData,
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
import {useSearchSelector} from './useSearchSelector';
import {useSearchActions} from './useSearchActions';
import {useRoute} from '@react-navigation/native';
import {SearchScreenRouteProps} from '../../screens/Search/types';
import {checkIfFiltersAreUnset} from 'core/transformators/filters';

export function useSearchList() {
  const dispatch = useDispatch();
  const {
    setSearchInputValue,
    searchObjectsRequest,
    getSearchObjectsHistoryRequest,
    searchMoreObjectsRequest,
    addSearchObjectToHistory,
  } = useSearchActions();

  const historyObjectsIds = useSelector(selectSearchHistoryObjectsIds);
  const historyObjects = useSearchSelector(selectSearchHistory);

  const {params} = useRoute<SearchScreenRouteProps>();

  const {filtersToApply} = params || {};

  const searchResults = useSearchSelector(selectSearchObjectsData);

  const searchResultsTotal = useSearchSelector(selectSearchObjectsTotal);
  const inputValue = useSearchSelector(selectSearchInputValue);

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
  }, [dispatch, getSearchObjectsHistoryRequest]);

  const searchObjects = useCallback(() => {
    if (inputValue || filtersToApply) {
      dispatch(
        searchObjectsRequest({query: inputValue, filters: filtersToApply}),
      );
    }
  }, [dispatch, filtersToApply, inputValue, searchObjectsRequest]);

  const searchMoreObjects = useCallback(() => {
    if (inputValue || filtersToApply) {
      dispatch(
        searchMoreObjectsRequest({query: inputValue, filters: filtersToApply}),
      );
    }
  }, [dispatch, filtersToApply, inputValue, searchMoreObjectsRequest]);

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const isSearchEmpty = inputValue === '';
  const isFiltersEmpty =
    !filtersToApply || checkIfFiltersAreUnset(filtersToApply);

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

  const isHistoryVisible = isFiltersEmpty && (isSearchEmpty || isFirstLoad);

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

  useEffect(() => {
    searchObjectsDebounce();
  }, [searchObjectsDebounce]);

  const addToHistory = useCallback(
    (object: SearchObject) => {
      dispatch(addObjectIdToUserSearchHistory(object.id));
      dispatch(addSearchObjectToHistory({searchObject: object}));
    },
    [addSearchObjectToHistory, dispatch],
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
