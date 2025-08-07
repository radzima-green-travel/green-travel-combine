import {Portal} from '@gorhom/portal';
import {useNavigation} from '@react-navigation/native';
import {BottomMenu, Button, CustomHeader, Icon} from 'atoms';
import {composeTestID} from 'core/helpers';
import {
  useBottomMenu,
  useColorScheme,
  useStatusBar,
  useThemeStyles,
} from 'core/hooks';
import {SearchFiltersItem, SearchOptions} from 'core/types';
import {noop} from 'lodash';
import {
  HeaderBackButton,
  SearchField,
  SearchFiltersBar,
  SearchOptionsBottomMenu,
} from 'molecules';
import React, {memo, useCallback} from 'react';
import {Keyboard, StyleProp, Text, View, ViewStyle} from 'react-native';
import {themeStyles} from './styles';

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

    const navigation = useNavigation();

    const scheme = useColorScheme();

    useStatusBar(scheme);

    const {openMenu, ...bottomMenuProps} = useBottomMenu();

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

    const renderSearchInput = () => (
      <SearchField
        testID={composeTestID(testID, 'searchInput')}
        value={searchInputValue}
        autoFocus={autoFocus}
        onChange={onSearchInputValueChange}
        filterActionTypeEnabled
        onRightButtonPress={onSearchActionButtonPress}
      />
    );

    const renderFilterButton = () => (
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

    const renderFilterBar = () => (
      <>
        {!!appliedFilters?.length && (
          <SearchFiltersBar
            testID={composeTestID(testID, 'filtersBar')}
            onFilterPress={onRemoveFilterPress}
            filters={appliedFilters}
            style={styles.filterList}
            contentContainerStyle={styles.filterListContent}
          />
        )}
      </>
    );

    const renderBackButton = () => (
      <HeaderBackButton
        testID="backButton"
        onPress={navigation.goBack}
        containerStyle={styles.backButton}
      />
    );

    // Traditional navigation.canGoBack() doesn't work well with navigating between tabs (Home to Explore e.g.)
    const canGoBack = navigation.getState()?.index! > 0;

    const renderTitle = () =>
      !!title && (
        <View style={styles.titleContainer}>
          {canGoBack && renderBackButton()}
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              canGoBack ? styles.titleSmall : styles.titleLarge,
            ]}>
            {title}
          </Text>
        </View>
      );

    return (
      <>
        <CustomHeader
          style={style}
          options={{
            headerLeft: !title && canGoBack ? renderBackButton : undefined,
            headerTitle: renderSearchInput,
            headerRight: renderFilterButton,
          }}
          withOverlay
          contentAbove={renderTitle}
          contentBelow={renderFilterBar}
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
