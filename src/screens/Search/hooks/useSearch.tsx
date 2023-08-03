import {useCallback, useEffect} from 'react';

import {IObject} from 'core/types';
import {useSearchList} from 'core/hooks';
import {Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SearchScreenNavigationProps} from '../types';

export const useSearch = () => {
  const {
    data,
    isHistoryVisible,
    addToHistory,
    deleteFromHistory,
    deleteAllFromHistory,
    clearInput,
    inputValue,
  } = useSearchList();

  const navigation = useNavigation<SearchScreenNavigationProps>();

  const navigateToObjectDetails = useCallback(
    (searchItem: IObject) => {
      Keyboard.dismiss();
      addToHistory(searchItem);
      navigation.navigate('ObjectDetails', {
        objectId: searchItem.id,
      });
    },
    [addToHistory, navigation],
  );

  const deleteItem = useCallback(
    (searchItem: IObject) => {
      deleteFromHistory(searchItem);
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
    isSearchQueryEmpty: !inputValue,
  };
};
