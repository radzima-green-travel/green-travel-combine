import {useCallback, useEffect} from 'react';

import {useSearchList, useStaticCallback} from 'core/hooks';
import {Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SearchScreenNavigationProps} from '../types';
import {getAnalyticsNavigationScreenName} from 'core/helpers';
import {find} from 'lodash';
import {useSearchAnalytics} from './useSearchAnalytics';

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
    isSearchEmpty,
    isFiltersEmpty,
  } = useSearchList();

  const {
    sendSearchViewEvent,
    sendSearchHistoryClearEvent,
    sendSearchHistoryItemRemoveEvent,
    sendSearchResultsItemClickEvent,
  } = useSearchAnalytics();

  useEffect(() => {
    sendSearchViewEvent();
  }, [sendSearchViewEvent]);

  const navigation = useNavigation<SearchScreenNavigationProps>();

  const navigateToObjectDetails = useStaticCallback(
    (objectId: string) => {
      Keyboard.dismiss();

      const searchItem = find(data, {id: objectId});
      if (searchItem) {
        if (!isHistoryVisible) {
          addToHistory(objectId);
        }
        navigation.navigate('ObjectDetails', {
          objectId: searchItem.id,
          objectCoverImageUrl: searchItem.cover,
          objcetCoverBlurhash: searchItem.blurhash,
          analytics: {
            fromScreenName: getAnalyticsNavigationScreenName(),
          },
        });

        sendSearchResultsItemClickEvent({
          isHistoryVisible,
          isFiltersApplied: !isFiltersEmpty,
          isSearchQueryApplied: !isSearchEmpty,
        });
      }
    },
    [addToHistory, isHistoryVisible, navigation, data],
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
  };
};
