import {useCallback, useEffect} from 'react';

import {useSearchList, useStaticCallback} from 'core/hooks';
import {Keyboard} from 'react-native';
import {getAnalyticsNavigationScreenName} from 'core/helpers';
import {find} from 'lodash';
import {useSearchAnalytics} from './useSearchAnalytics';
import {useRouter} from 'expo-router';

export const useSearch = () => {
  const {
    data,
    isHistoryVisible,
    addToHistory,
    deleteFromHistory,
    deleteAllFromHistory,
    clearInput,
    searchSuspenseProps,
    searchHistorySuspenseProps,
    listPaninationProps,
    isSearchPreviewVisible,
    totalResults,
    filtersItems,
    removeAppliedFilter,
    isSearchEmpty,
    isFiltersEmpty,
  } = useSearchList();

  const {
    sendSearchViewEvent,
    sendSearchHistoryClearEvent,
    sendSearchHistoryItemRemoveEvent,
    sendFilterRemoveEvent,
    sendSearchResultsItemClickEvent,
  } = useSearchAnalytics();

  useEffect(() => {
    sendSearchViewEvent();
  }, [sendSearchViewEvent]);

  const router = useRouter();

  const navigateToObjectDetails = useStaticCallback(
    (objectId: string) => {
      Keyboard.dismiss();

      const searchItem = find(data, {id: objectId});
      if (searchItem) {
        if (!isHistoryVisible) {
          addToHistory(objectId);
        }

        router.navigate({
          pathname: '/object/[objectId]',
          params: {
            objectId: searchItem.id,
            objectCoverImageUrl: searchItem.cover,
            objcetCoverBlurhash: searchItem.blurhash,
            fromScreenName: getAnalyticsNavigationScreenName(),
            test: ['123', '456'],
          },
        });

        sendSearchResultsItemClickEvent({
          isHistoryVisible,
          isFiltersApplied: !isFiltersEmpty,
          isSearchQueryApplied: !isSearchEmpty,
        });
      }
    },
    [addToHistory, isHistoryVisible, router, data],
  );

  const deleteItem = useCallback(
    (objectId: string) => {
      deleteFromHistory(objectId);
      sendSearchHistoryItemRemoveEvent(objectId);
    },
    [deleteFromHistory, sendSearchHistoryItemRemoveEvent],
  );

  const deleteAllItems = useCallback(() => {
    deleteAllFromHistory();
    sendSearchHistoryClearEvent();
  }, [deleteAllFromHistory, sendSearchHistoryClearEvent]);

  const removeAppliedFilterHandler = useCallback(
    (filterName: string) => {
      removeAppliedFilter(filterName);
      sendFilterRemoveEvent(filterName);
    },
    [removeAppliedFilter, sendFilterRemoveEvent],
  );

  useEffect(() => {
    return () => {
      clearInput();
    };
  }, [clearInput]);

  return {
    isHistoryVisible,
    data,
    navigateToObjectDetails,
    deleteItem,
    deleteAllItems,
    searchSuspenseProps,
    searchHistorySuspenseProps,
    listPaninationProps,
    isSearchPreviewVisible,
    totalResults,
    filtersItems,
    removeAppliedFilter: removeAppliedFilterHandler,
  };
};
