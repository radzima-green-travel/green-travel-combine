import React from 'react';
import {screenOptions} from './screenOptions';

import {SearchList} from 'organisms';
import {useSearch} from './hooks';
import {SuspenseView} from 'molecules';
import {useColorScheme, useStatusBar, useThemeStyles} from 'core/hooks';
import {View} from 'react-native';
import {themeStyles} from './styles';

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

  const styles = useThemeStyles(themeStyles);

  const scheme = useColorScheme();

  useStatusBar(scheme);

  return (
    <SuspenseView
      testID="searchSusspenseView"
      cover
      loaderBackdropStyle={styles.loaderBackdrop}
      {...searchHistorySuspenseProps}>
      <View style={styles.listContainer}>
        <SuspenseView
          testID="searchSusspenseView"
          cover
          loaderBackdropStyle={styles.loaderBackdrop}
          {...searchSuspenseProps}>
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
      </View>
    </SuspenseView>
  );
};

Search.screenOptions = screenOptions;
