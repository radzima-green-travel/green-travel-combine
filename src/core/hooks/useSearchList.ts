import {useNavigation, useRoute} from '@react-navigation/native';
import {
  selectAppLanguage,
  selectSearchObjectsData,
  selectSearchObjectsTotal,
  selectSearchOptions,
  selectSearchQuery,
  selectUserAuthorized,
} from 'core/selectors';
import {useCallback, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRequestLoading} from 'react-redux-help-kit';
import {ObjectListViewMode} from '../../components/types';
import {
  SearchScreenNavigationProps,
  SearchScreenRouteProps,
} from '../../screens/Search/types';
import {getAnalyticsNavigationScreenName} from '../helpers';
import {SearchObject} from '../types';
import {useListPagination} from './useListPagination';
import {useOnRequestError} from './useOnRequestError';
import {useSearchActions} from './useSearchActions';
import {useSearchSelector} from './useSearchSelector';
import {Keyboard} from 'react-native';

export function useSearchList() {
  const dispatch = useDispatch();

  const navigation = useNavigation<SearchScreenNavigationProps>();

  const {searchObjectsRequest, searchMoreObjectsRequest} = useSearchActions();

  const searchResults = useSearchSelector(selectSearchObjectsData);
  const searchResultsTotal = useSearchSelector(selectSearchObjectsTotal);
  const searchQuery = useSearchSelector(selectSearchQuery);

  // Search options change should not trigger data refetch
  const searchOptions = useSearchSelector(selectSearchOptions);
  const searchOptionsRef = useRef(searchOptions);
  searchOptionsRef.current = searchOptions;

  const appLocale = useSelector(selectAppLanguage);
  const isAuthorized = useSelector(selectUserAuthorized);

  const {params} = useRoute<SearchScreenRouteProps>();

  const {appliedFilters, title: pageTitle, showsTitle} = params || {};

  const {loading} = useRequestLoading(searchObjectsRequest);
  const {errorTexts} = useOnRequestError(searchObjectsRequest, '');

  const {loading: nextDataLoading} = useRequestLoading(
    searchMoreObjectsRequest,
  );

  const searchParameters = useMemo(() => {
    return {
      query: searchQuery,
      filters: appliedFilters,
      options: searchOptionsRef.current,
    };
  }, [searchQuery, appliedFilters]);

  const searchObjects = useCallback(() => {
    dispatch(searchObjectsRequest(searchParameters));
  }, [dispatch, searchObjectsRequest, searchParameters]);

  const searchMoreObjects = useCallback(() => {
    dispatch(
      searchMoreObjectsRequest({
        query: searchQuery,
        filters: appliedFilters,
        options: searchOptionsRef.current,
      }),
    );
  }, [dispatch, appliedFilters, searchQuery, searchMoreObjectsRequest]);

  const listPaninationProps = useListPagination({
    isLoading: nextDataLoading,
    loadMore: searchMoreObjects,
    hasMoreToLoad: !loading && searchResults.length < searchResultsTotal,
  });

  const [viewMode, setViewMode] = useState<ObjectListViewMode>('list');

  const prevQuery = useRef(searchQuery);

  if (prevQuery.current !== searchQuery) {
    prevQuery.current = searchQuery;
    setViewMode('list');
  }

  const openObjectDetails = useCallback(
    (object: SearchObject) => {
      Keyboard.dismiss();
      navigation.navigate('ObjectDetails', {
        objectId: object.id,
        objectCoverImageUrl: object.cover,
        objcetCoverBlurhash: object.blurhash,
        analytics: {
          fromScreenName: getAnalyticsNavigationScreenName(),
        },
      });
    },
    [navigation],
  );

  const dataLoaded = !!searchResults.length;

  const initSearch = useCallback(searchObjects, [
    searchObjects,
    appLocale,
    isAuthorized,
    dataLoaded,
  ]);

  return {
    searchResults,
    listPaninationProps,
    searchSuspenseProps: {
      loading: loading,
      error: errorTexts,
      retryCallback: searchObjects,
    },
    totalResults: searchResultsTotal,
    initSearch,
    pageTitle: showsTitle ? pageTitle : undefined,
    viewMode,
    setViewMode,
    openObjectDetails,
    searchParameters,
  };
}
