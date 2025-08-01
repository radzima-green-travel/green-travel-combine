import {useNavigation, useRoute} from '@react-navigation/native';
import {
  selectAppLanguage,
  selectSearchObjectsData,
  selectSearchObjectsTotal,
  selectSearchOptions,
  selectSearchQuery,
  selectUserAuthorized,
} from 'core/selectors';
import {useCallback, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRequestLoading, useStaticCallback} from 'react-redux-help-kit';
import {ObjectListViewMode} from '../../components/types';
import {
  SearchScreenNavigationProps,
  SearchScreenRouteProps,
} from '../../screens/Search/types';
import {getAnalyticsNavigationScreenName} from '../helpers';
import {useListPagination} from './useListPagination';
import {useOnRequestError} from './useOnRequestError';
import {useSearchActions} from './useSearchActions';
import {useSearchSelector} from './useSearchSelector';
import {SearchObject} from '../types';

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

  const searchObjects = useCallback(() => {
    dispatch(
      searchObjectsRequest({
        query: searchQuery,
        filters: appliedFilters,
        options: searchOptionsRef.current,
      }),
    );
  }, [dispatch, appliedFilters, searchObjectsRequest, searchQuery]);

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

  // static callback is not generic and provides only loose type
  const objectPressHandler = (object: SearchObject) => {
    navigation.navigate('ObjectDetails', {
      objectId: object.id,
      objectCoverImageUrl: object.cover,
      objcetCoverBlurhash: object.blurhash,
      analytics: {
        fromScreenName: getAnalyticsNavigationScreenName(),
      },
    });
  };

  const openObjectDetails = useStaticCallback(objectPressHandler, [
    navigation,
    searchResults,
  ]) as typeof objectPressHandler;

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
    isSearchPromptVisible: !searchQuery.length && !appliedFilters,
    initSearch,
    pageTitle: showsTitle ? pageTitle : undefined,
    viewMode,
    setViewMode,
    openObjectDetails,
  };
}
