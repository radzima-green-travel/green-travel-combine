import React from 'react';
import {screenOptions} from './screenOptions';

import {SearchList} from 'organisms';
import {useSearch} from './hooks';
import {SuspenseView} from 'atoms';

export const Search = () => {
  const {
    isHistoryVisible,
    data,
    navigateToObjectDetails,
    deleteItem,
    deleteAllItems,
    isSearchPreviewVisible,
    searchSuspenseProps,
    searchHistorySuspenseProps,
    listPaninationProps,
  } = useSearch();

  return (
    <SuspenseView cover {...searchSuspenseProps}>
      <SuspenseView cover {...searchHistorySuspenseProps}>
        <SearchList
          isHistoryVisible={isHistoryVisible}
          data={data}
          onItemPress={navigateToObjectDetails}
          onDeletePress={deleteItem}
          onDeleteAllPress={deleteAllItems}
          isSearchPreviewVisible={isSearchPreviewVisible}
          listPaninationProps={listPaninationProps}
        />
      </SuspenseView>
    </SuspenseView>
  );
};

Search.screenOptions = screenOptions;
