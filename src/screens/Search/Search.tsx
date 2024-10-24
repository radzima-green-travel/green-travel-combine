import React from 'react';
import {screenOptions} from './screenOptions';

import {SearchList} from 'organisms';
import {useSearch} from './hooks';
import {SuspenseView} from 'atoms';
import {useColorScheme, useStatusBar} from 'core/hooks';

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
    totalResults,
  } = useSearch();

  const scheme = useColorScheme();

  useStatusBar(scheme);

  return (
    <SuspenseView testID="searchSusspenseView" cover {...searchSuspenseProps}>
      <SuspenseView
        testID="searchSusspenseView"
        cover
        {...searchHistorySuspenseProps}>
        <SearchList
          testID={'searchList'}
          isHistoryVisible={isHistoryVisible}
          data={data}
          onItemPress={navigateToObjectDetails}
          onDeletePress={deleteItem}
          onDeleteAllPress={deleteAllItems}
          isSearchPreviewVisible={isSearchPreviewVisible}
          listPaninationProps={listPaninationProps}
          totalResults={totalResults}
        />
      </SuspenseView>
    </SuspenseView>
  );
};

Search.screenOptions = screenOptions;
