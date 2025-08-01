import {useCallback, useLayoutEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  addObjectIdToUserSearchHistory,
  addSearchObjectToHistory,
  deleteAllFromUserSearchHistory,
  deleteObjectIdFromUserSearchHistory,
  getSearchObjectsHistoryRequest,
} from 'core/actions';
import {
  useOnRequestError,
  useRequestLoading,
  useSearchSelector,
} from 'core/hooks';
import {
  selectIsUserHasSavedSearchHistory,
  selectSearchHistory,
  selectSearchObjectsRawData,
  selectSearchQuery,
} from 'core/selectors';
import {find} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {SearchScreenRouteProps} from '../types';

export const useSearchHistory = () => {
  const dispatch = useDispatch();

  const {params} = useRoute<SearchScreenRouteProps>();

  const {appliedFilters} = params || {};

  const searchQuery = useSearchSelector(selectSearchQuery);
  const isUserHasSavedSearchHistory = useSelector(
    selectIsUserHasSavedSearchHistory,
  );
  const isSearchEmpty = !searchQuery.length;
  const isFiltersEmpty = !appliedFilters;

  const isHistoryVisible =
    isUserHasSavedSearchHistory && isFiltersEmpty && isSearchEmpty;

  const historyObjects = useSelector(selectSearchHistory);

  const needToLoadHistory =
    isUserHasSavedSearchHistory && !historyObjects.length;

  const {loading: historyLoading} = useRequestLoading(
    getSearchObjectsHistoryRequest,
  );
  const {errorTexts: historyLoadingError} = useOnRequestError(
    getSearchObjectsHistoryRequest,
    '',
  );

  const getSearchObjectsHistory = useCallback(() => {
    dispatch(getSearchObjectsHistoryRequest());
  }, [dispatch]);

  useLayoutEffect(() => {
    if (needToLoadHistory) {
      getSearchObjectsHistory();
    }
  }, [dispatch, needToLoadHistory, getSearchObjectsHistory]);

  const searchResults = useSearchSelector(selectSearchObjectsRawData);

  const addObjectToHistory = useCallback(
    (objectId: string) => {
      const rawObject = find(searchResults, {id: objectId});

      dispatch(addObjectIdToUserSearchHistory(objectId));
      if (rawObject) {
        dispatch(addSearchObjectToHistory({searchObject: rawObject}));
      }
    },
    [dispatch, searchResults],
  );

  const deleteObjectFromHistory = useCallback(
    (objectId: string) => {
      dispatch(deleteObjectIdFromUserSearchHistory(objectId));
    },
    [dispatch],
  );

  const clearHistory = useCallback(() => {
    dispatch(deleteAllFromUserSearchHistory());
  }, [dispatch]);

  return {
    historyObjects,
    isHistoryVisible,
    isSearchEmpty,
    isFiltersEmpty,
    addObjectToHistory,
    deleteObjectFromHistory,
    clearHistory,
    historySuspenseProps: {
      loading: historyLoading,
      error: historyLoadingError,
      retryCallback: getSearchObjectsHistory,
    },
  };
};
