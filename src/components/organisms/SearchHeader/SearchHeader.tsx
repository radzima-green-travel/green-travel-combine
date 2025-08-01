import {BottomMenu, Button, CustomHeader, Icon} from 'atoms';
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
import React, {useCallback} from 'react';
import {Keyboard, StyleProp, Text, View, ViewStyle} from 'react-native';
import {themeStyles} from './styles';
import {Portal} from '@gorhom/portal';
import {composeTestID} from '../../../core/helpers';
import {useNavigation} from '@react-navigation/native';

interface SearchHeaderProps {
  testID: string;

  title?: string;
  searchQuery: string;
  autoFocus?: boolean;
  onSearchQueryChange: (value: string) => void;

  onResetSearchPress: () => void;
  onOptionsMenuButtonPress?: () => void;

  onFilterButtonPress: () => void;
  numberOfAppliedFilters?: number;
  appliedFilters?: SearchFiltersItem[];
  onRemoveFilterPress: (filterId: string) => void;

  onBackPress?: () => void;
  canGoBack?: boolean;

  searchOptions: SearchOptions;
  onOptionsChange?: (newOptions: SearchOptions) => void;
  onOptionsMenuClose?: () => void;

  style?: StyleProp<ViewStyle>;
}

export const SearchHeader = ({
  testID,
  title,
  searchQuery,
  onSearchQueryChange,
  onResetSearchPress,
  autoFocus = true,

  onFilterButtonPress,
  numberOfAppliedFilters,
  appliedFilters,
  onRemoveFilterPress,

  onBackPress,
  canGoBack,

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
      containerStyle={styles.headerTitleContainer}
      value={searchQuery}
      autoFocus={autoFocus}
      onChange={onSearchQueryChange}
      filterActionTypeEnabled
      onRightButtonPress={onSearchActionButtonPress}
    />
  );

  const renderHeaderRight = () => (
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

  const renderBottomContent = () => (
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

  const headerLeft = () => (
    <HeaderBackButton
      testID="backButton"
      onPress={onBackPress ?? navigation.goBack}
      containerStyle={styles.backButton}
    />
  );

  const renderTitle = () => title && <Text style={styles.title}>{title}</Text>;

  const backButtonVisible = [
    canGoBack === true,
    navigation.getState()?.index! > 0,
  ].some(Boolean);

  return (
    <>
      <CustomHeader
        style={style}
        options={{
          headerLeft: backButtonVisible ? headerLeft : undefined,
          headerTitle: renderSearchInput,
          headerRight: renderHeaderRight,
        }}
        withOverlay
        contentAbove={renderTitle}
        contentBelow={renderBottomContent}
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
};
