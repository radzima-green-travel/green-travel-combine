import React, {useCallback, useEffect} from 'react';

import {SuspenseView} from 'components/molecules';
import {ObjectList, SearchHeader} from 'components/organisms';
import {
  useObjectsListAnalytics,
  useSearchHeader,
  useSearchList,
  useObjectListView,
  useThemeStyles,
} from 'core/hooks';
import {themeStyles} from './styles';
import {SearchObject} from '../../core/types';

export const ObjectListScreen = () => {
  const {sendSaveCardEvent, sendSelectCardEvent, sendUnsaveCardEvent} =
    useObjectsListAnalytics();

  const {
    searchResults,
    initSearch,
    listPaninationProps,
    searchSuspenseProps,
    totalResults,
    viewMode,
    setViewMode,
    openObjectDetails,
    searchParameters,
  } = useSearchList();

  const {
    pageTitle,
    searchInputValue,
    setSearchInputValue,
    clearSearchInputValue,
    onFilterButtonPress,
    appliedFilters,
    removeAppliedFilter,
    numberOfAppliedFilters,
    searchOptions,
    updateSearchOptions,
  } = useSearchHeader();

  useEffect(initSearch, [initSearch]);

  const styles = useThemeStyles(themeStyles);

  const handleItemPress = useCallback(
    (object: SearchObject) => {
      sendSelectCardEvent(object.name, object.category.analyticsMetadata.name);
      openObjectDetails(object);
    },
    [openObjectDetails, sendSelectCardEvent],
  );

  const handleFavoriteStatusChange = useCallback(
    (object: SearchObject, nextIsFavorite: boolean) => {
      if (nextIsFavorite) {
        sendSaveCardEvent(object.name, object.category.analyticsMetadata.name);
      } else {
        sendUnsaveCardEvent(
          object.name,
          object.category.analyticsMetadata.name,
        );
      }
    },
    [sendSaveCardEvent, sendUnsaveCardEvent],
  );

  const mapWithBottomSheetProps = useObjectListView({
    searchParameters: searchParameters,
  });

  return (
    <>
      <SearchHeader
        testID="header"
        title={pageTitle}
        searchInputValue={searchInputValue}
        onSearchInputValueChange={setSearchInputValue}
        onResetSearchPress={clearSearchInputValue}
        onFilterButtonPress={onFilterButtonPress}
        appliedFilters={appliedFilters}
        onRemoveFilterPress={removeAppliedFilter}
        numberOfAppliedFilters={numberOfAppliedFilters}
        searchOptions={searchOptions}
        onOptionsChange={updateSearchOptions}
        autoFocus={false}
      />
      <SuspenseView testID="objectsListSuspenseView" {...searchSuspenseProps}>
        <ObjectList
          testID="objectList"
          data={searchResults}
          totalResults={totalResults}
          onItemPress={handleItemPress}
          style={styles.listContainer}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onToggleFavoriteStatusPress={handleFavoriteStatusChange}
          mapWithBottomSheetProps={mapWithBottomSheetProps}
          {...listPaninationProps}
        />
      </SuspenseView>
    </>
  );
};
