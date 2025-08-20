import React, {useCallback, useEffect} from 'react';

import {
  useSearchHeader,
  useSearchList,
  useSearchMapView,
  useThemeStyles,
} from 'core/hooks';
import {SuspenseView} from 'molecules';
import {SearchHeader, SearchList, MapWithBottomSheet} from 'organisms';
import {useSearchHistory} from './hooks';
import {useSearchAnalytics} from './hooks/useSearchAnalytics';
import {themeStyles} from './styles';
import {SearchObject} from '../../core/types';

import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';

const AnimatedBottomSheetFlatList =
  Animated.createAnimatedComponent(BottomSheetFlatList);

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
    searchParameters,
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

  const mapWithBottomSheetProps = useSearchMapView({
    searchParameters: searchParameters,
  });

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

  const rendnerList = () => {
    const showPlainList = isHistoryVisible || (isSearchEmpty && isFiltersEmpty);
    const list = (
      <SearchList
        testID="searchList"
        ListComponent={
          showPlainList ? undefined : (AnimatedBottomSheetFlatList as any)
        }
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
    );
    if (showPlainList) {
      return list;
    }

    return (
      <MapWithBottomSheet
        onObjectPress={openObjectDetails}
        {...mapWithBottomSheetProps}>
        {list}
      </MapWithBottomSheet>
    );
  };

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
        <SuspenseView
          testID="searchSusspenseView"
          cover
          loaderBackdropStyle={styles.loaderBackdrop}
          {...searchSuspenseProps}>
          {rendnerList()}
        </SuspenseView>
      </SuspenseView>
    </>
  );
};
