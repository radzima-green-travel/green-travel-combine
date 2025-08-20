import React, {useCallback, useEffect} from 'react';

import {SuspenseView} from 'components/molecules';
import {
  MapWithBottomSheet,
  ObjectList,
  SearchHeader,
} from 'components/organisms';
import {
  useObjectsListAnalytics,
  useSearchHeader,
  useSearchList,
  useSearchMapView,
  useThemeStyles,
} from 'core/hooks';
import {themeStyles} from './styles';
import {SearchObject} from '../../core/types';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';

const AnimatedBottomSheetFlatList =
  Animated.createAnimatedComponent(BottomSheetFlatList);
export const ObjectListScreen = () => {
  const {sendSaveCardEvent, sendSelectCardEvent, sendUnsaveCardEvent} =
    useObjectsListAnalytics();

  const {
    searchResults,
    initSearch,
    listPaninationProps,
    searchSuspenseProps,
    totalResults,
    pageTitle,
    viewMode,
    setViewMode,
    openObjectDetails,
    searchParameters,
  } = useSearchList();

  const {
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

  const mapWithBottomSheetProps = useSearchMapView({
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
      <SuspenseView
        testID="objectsListSuspenseView"
        {...searchSuspenseProps}
        cover>
        <MapWithBottomSheet
          onObjectPress={openObjectDetails}
          {...mapWithBottomSheetProps}>
          <ObjectList
            testID="objectList"
            ListComponent={AnimatedBottomSheetFlatList as any}
            data={searchResults}
            totalResults={totalResults}
            onItemPress={handleItemPress}
            style={styles.listContainer}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onToggleFavoriteStatusPress={handleFavoriteStatusChange}
            {...listPaninationProps}
          />
        </MapWithBottomSheet>
      </SuspenseView>
    </>
  );
};
