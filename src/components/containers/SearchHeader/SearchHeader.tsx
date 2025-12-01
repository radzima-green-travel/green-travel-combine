import { Portal } from '@gorhom/portal';
import { BottomMenu, Button, Icon } from 'atoms';
import { composeTestID } from 'core/helpers';
import { useBottomMenu, useThemeStyles } from 'core/hooks';
import { SearchFiltersItem, SearchOptions } from 'core/types';
import { noop } from 'lodash';
import {
  SearchField,
  SearchFiltersBar,
  SearchOptionsBottomMenu,
} from 'molecules';
import React, { memo, useCallback } from 'react';
import { Keyboard, StyleProp, Text, View, ViewStyle } from 'react-native';
import { Header } from '../Header';
import { themeStyles } from './styles';

interface SearchHeaderProps {
  testID: string;

  title?: string;
  searchInputValue: string;
  autoFocus?: boolean;
  onSearchInputValueChange: (value: string) => void;

  onResetSearchPress: () => void;
  onOptionsMenuButtonPress?: () => void;

  onFilterButtonPress: () => void;
  numberOfAppliedFilters?: number;
  appliedFilters?: SearchFiltersItem[];
  onRemoveFilterPress: (filterId: string) => void;

  searchOptions: SearchOptions;
  onOptionsChange?: (newOptions: SearchOptions) => void;
  onOptionsMenuClose?: () => void;

  style?: StyleProp<ViewStyle>;
}

export const SearchHeader = memo(
  ({
    testID,
    title,
    searchInputValue,
    onSearchInputValueChange,
    onResetSearchPress,
    autoFocus = true,

    onFilterButtonPress,
    numberOfAppliedFilters,
    appliedFilters,
    onRemoveFilterPress,

    onOptionsMenuButtonPress,
    searchOptions,
    onOptionsChange = noop,
    onOptionsMenuClose,

    style,
  }: SearchHeaderProps) => {
    const styles = useThemeStyles(themeStyles);

    const { openMenu, ...bottomMenuProps } = useBottomMenu();

    const onSearchActionButtonPress = useCallback(
      (actionType: 'reset' | 'filter') => {
        if (actionType === 'reset') {
          onResetSearchPress?.();
        }
        if (actionType === 'filter') {
          Keyboard.dismiss();
          openMenu();
          onOptionsMenuButtonPress?.();
        }
      },
      [onResetSearchPress, openMenu, onOptionsMenuButtonPress],
    );

    const searchInput = (
      <View style={{ flex: 1 }}>
        <SearchField
          testID={composeTestID(testID, 'searchInput')}
          value={searchInputValue}
          autoFocus={autoFocus}
          onChange={onSearchInputValueChange}
          filterActionTypeEnabled
          onRightButtonPress={onSearchActionButtonPress}
        />
      </View>
    );

    const filterButton = (
      <View>
        <Button
          testID={composeTestID(testID, 'filterButton')}
          isIconOnlyButton
          renderIcon={textStyle => (
            <Icon name="tune" size={24} style={textStyle} />
          )}
          onPress={onFilterButtonPress}
          theme="quarterlyGrey"
        />
        {numberOfAppliedFilters ? (
          <View style={styles.filtersBadge}>
            <Text style={styles.filterBadgeText}>{numberOfAppliedFilters}</Text>
          </View>
        ) : null}
      </View>
    );

    const filtersBar = appliedFilters?.length ? (
      <SearchFiltersBar
        testID={composeTestID(testID, 'filtersBar')}
        onFilterPress={onRemoveFilterPress}
        filters={appliedFilters}
        style={styles.filterList}
        contentContainerStyle={styles.filterListContent}
      />
    ) : null;

    return (
      <>
        <Header
          testID={composeTestID(testID, 'header')}
          style={style}
          topSlot={({ canGoBack }) => {
            return title ? (
              <>
                {canGoBack && <Header.BackButton />}
                <Header.Title
                  size={canGoBack ? 'small' : 'large'}
                  style={canGoBack ? undefined : { paddingTop: 8 }}>
                  {title}
                </Header.Title>
              </>
            ) : null;
          }}
          backButtonHidden={!!title}
          titleSlot={searchInput}
          rightSlot={filterButton}
          bottomSlot={filtersBar}
        />
        <Portal>
          <BottomMenu
            onHideEnd={onOptionsMenuClose}
            testID={composeTestID(testID, 'optionsMenu')}
            withBackdrop
            {...bottomMenuProps}>
            <SearchOptionsBottomMenu
              value={searchOptions}
              onChange={onOptionsChange}
              bottomInset={0}
            />
          </BottomMenu>
        </Portal>
      </>
    );
  },
);
