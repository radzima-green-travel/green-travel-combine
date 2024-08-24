import {useCallback, useEffect} from 'react';

import {SearchObject} from 'core/types';
import {useSearchList} from 'core/hooks';
import {Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SearchScreenNavigationProps} from '../types';
import {getAnalyticsNavigationScreenName} from 'core/helpers';

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
  } = useSearchList();

  const navigation = useNavigation<SearchScreenNavigationProps>();

  const navigateToObjectDetails = useCallback(
    (searchItem: SearchObject) => {
      Keyboard.dismiss();

      if (!isHistoryVisible) {
        addToHistory(searchItem);
      }
      navigation.navigate('ObjectDetails', {
        objectId: searchItem.id,
        objectCoverImageUrl: searchItem.cover,
        objcetCoverBlurhash: searchItem.blurhash,
        analytics: {
          fromScreenName: getAnalyticsNavigationScreenName(),
        },
      });
    },
    [addToHistory, isHistoryVisible, navigation],
  );

  const deleteItem = useCallback(
    (searchItem: SearchObject) => {
      deleteFromHistory(searchItem.id);
    },
    [deleteFromHistory],
  );

  const deleteAllItems = useCallback(() => {
    deleteAllFromHistory();
  }, [deleteAllFromHistory]);

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
  };
};
