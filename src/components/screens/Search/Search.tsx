import React, {useCallback, useEffect} from 'react';
import {screenOptions} from './screenOptions';

import {IObject} from 'core/types';
import {IProps} from './types';
import {SearchList} from 'organisms';
import {useSearchList} from 'core/hooks';
import {Keyboard} from 'react-native';

export const Search = ({navigation}: IProps) => {
  const {
    data,
    isHistoryVisible,
    addToHistory,
    deleteFromHistory,
    deleteAllFromHistory,
    clearInput,
  } = useSearchList();

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

  return (
    <SearchList
      isHistoryVisible={isHistoryVisible}
      data={data}
      onItemPress={navigateToObjectDetails}
      onDeletePress={deleteItem}
      onDeleteAllPress={deleteAllItems}
    />
  );
};

Search.screenOptions = screenOptions;
