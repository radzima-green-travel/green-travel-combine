import React, {useCallback, useEffect} from 'react';

import {useSearchHeader, useSearchList, useThemeStyles} from 'core/hooks';
import {SuspenseView} from 'molecules';
import {SearchHeader, SearchList} from 'organisms';
import {View} from 'react-native';
import {useSearchHistory} from './hooks';
import {useSearchAnalytics} from './hooks/useSearchAnalytics';
import {themeStyles} from './styles';
import {SearchObject} from '../../core/types';

export const SearchScreen = () => {
  const {
    sendSearchViewEvent,
    sendSearchHistoryClearEvent,
    sendSearchHistoryItemRemoveEvent,
    sendSearchResultsItemClickEvent,
  } = useSearchAnalytics();

  const {
    searchResults,
    searchSuspenseProps,
    listPaninationProps,
    totalResults,
    initSearch,
    openObjectDetails,
    viewMode,
    setViewMode,
  } = useSearchList();

  const {
    historyObjects,
    isHistoryVisible,
    isSearchEmpty,
    isFiltersEmpty,
    addObjectToHistory,
    deleteObjectFromHistory,
    clearHistory,
    historySuspenseProps,
  } = useSearchHistory();

  const styles = useThemeStyles(themeStyles);

  const {
    searchInputValue,
    setSearchInputValue,
    clearSearchInputValue,
    appliedFilters,
    numberOfAppliedFilters,
    removeAppliedFilter,
    updateSearchOptions,
    onFilterButtonPress,
    searchOptions,
  } = useSearchHeader();

  useEffect(() => {
    if (!isHistoryVisible && (!isSearchEmpty || !isFiltersEmpty)) {
      initSearch();
    }
  }, [isHistoryVisible, initSearch, isSearchEmpty, isFiltersEmpty]);

  useEffect(() => {
    sendSearchViewEvent();
  }, [sendSearchViewEvent]);

  const data = isHistoryVisible ? historyObjects : searchResults;

  const itemPressHandler = useCallback(
    (object: SearchObject) => {
      if (!isHistoryVisible) {
        addObjectToHistory(object.id);
      }
      sendSearchResultsItemClickEvent({
        isHistoryVisible,
        isFiltersApplied: !!appliedFilters,
        isSearchQueryApplied: !!searchInputValue.length,
      });

      openObjectDetails(object);
    },
    [
      isHistoryVisible,
      sendSearchResultsItemClickEvent,
      appliedFilters,
      searchInputValue,
      openObjectDetails,
      addObjectToHistory,
    ],
  );

  const historyItemRemoveHandler = useCallback(
    (object: SearchObject) => {
      deleteObjectFromHistory(object.id);
      sendSearchHistoryItemRemoveEvent(object.id);
    },
    [deleteObjectFromHistory, sendSearchHistoryItemRemoveEvent],
  );

  const clearSearchHistoryHandler = useCallback(() => {
    clearHistory();
    sendSearchHistoryClearEvent();
  }, [clearHistory, sendSearchHistoryClearEvent]);

  return (
    <>
      <SearchHeader
        testID="header"
        searchInputValue={searchInputValue}
        onSearchInputValueChange={setSearchInputValue}
        onResetSearchPress={clearSearchInputValue}
        onFilterButtonPress={onFilterButtonPress}
        appliedFilters={appliedFilters}
        onRemoveFilterPress={removeAppliedFilter}
        numberOfAppliedFilters={numberOfAppliedFilters}
        onOptionsChange={updateSearchOptions}
        searchOptions={searchOptions}
        autoFocus
      />
      <SuspenseView
        testID="historySuspenseView"
        cover
        loaderBackdropStyle={styles.loaderBackdrop}
        {...historySuspenseProps}>
        <View style={styles.listContainer}>
          <SuspenseView
            testID="searchSusspenseView"
            cover
            loaderBackdropStyle={styles.loaderBackdrop}
            {...searchSuspenseProps}>
            <SearchList
              testID="searchList"
              isHistoryVisible={isHistoryVisible}
              data={data}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onItemPress={itemPressHandler}
              onDeletePress={historyItemRemoveHandler}
              onDeleteAllPress={clearSearchHistoryHandler}
              isSearchPromptVisible={
                !isHistoryVisible && isSearchEmpty && isFiltersEmpty
              }
              totalResults={totalResults}
              {...(!isHistoryVisible && listPaninationProps)}
            />
          </SuspenseView>
        </View>
      </SuspenseView>
    </>
  );
};
