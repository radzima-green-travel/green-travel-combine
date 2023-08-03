import React from 'react';
import {screenOptions} from './screenOptions';

import {SearchList} from 'organisms';
import {useSearch} from './hooks';

export const Search = () => {
  const {
    isHistoryVisible,
    data,
    navigateToObjectDetails,
    deleteItem,
    deleteAllItems,
    isSearchQueryEmpty,
  } = useSearch();

  return (
    <SearchList
      isHistoryVisible={isHistoryVisible}
      data={data}
      onItemPress={navigateToObjectDetails}
      onDeletePress={deleteItem}
      onDeleteAllPress={deleteAllItems}
      isSearchQueryEmpty={isSearchQueryEmpty}
    />
  );
};

Search.screenOptions = screenOptions;
