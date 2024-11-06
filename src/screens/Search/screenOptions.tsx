import {
  selectSearchInputValue,
  selectSearchQuery,
  selectUserAuthorized,
  selectSearchOptions,
} from 'core/selectors';
import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {IProps, ScreenOptions} from './types';
import {themeStyles} from './styles';
import {useBottomMenu, useThemeStyles} from 'core/hooks';
import {Icon, CustomNavigationHeader, Button, BottomMenu} from 'atoms';
import {useSearchActions, useSearchSelector} from 'core/hooks';
import {SearchField, SearchOptionsBottomMenu} from 'molecules';
import {Portal} from '@gorhom/portal';
import {SearchOptions} from 'core/types';
import {Keyboard, Text, View} from 'react-native';
import {prepareNumberOfAppliedFilters} from 'core/transformators/filters';
import {useSelector} from 'react-redux';

const HeaderTitle = () => {
  const dispatch = useDispatch();
  const {setSearchInputValue, setSearchOptions} = useSearchActions();
  const inputValue = useSearchSelector(selectSearchInputValue);
  const searchOptions = useSearchSelector(selectSearchOptions);
  const styles = useThemeStyles(themeStyles);
  const {openMenu, ...bottomMenuProps} = useBottomMenu();

  const setInputValue = useCallback(
    (text: string) => {
      dispatch(setSearchInputValue(text));
    },
    [dispatch, setSearchInputValue],
  );

  const onRightButtonPress = useCallback(
    (actionType: 'reset' | 'filter') => {
      if (actionType === 'reset') {
        setInputValue('');
      }
      if (actionType === 'filter') {
        Keyboard.dismiss();
        openMenu();
      }
    },
    [setInputValue, openMenu],
  );

  const updateSearchOptions = useCallback(
    (options: SearchOptions) => {
      dispatch(setSearchOptions(options));
    },
    [dispatch, setSearchOptions],
  );

  return (
    <>
      <SearchField
        testID="headerSearchbar"
        containerStyle={styles.headerTitleContainer}
        value={inputValue}
        onChange={setInputValue}
        filterActionTypeEnabled
        onRightButtonPress={onRightButtonPress}
      />
      <Portal>
        <BottomMenu testID={'bottomMenu'} withBackdrop {...bottomMenuProps}>
          <SearchOptionsBottomMenu
            value={searchOptions}
            onChange={updateSearchOptions}
            bottomInset={0}
          />
        </BottomMenu>
      </Portal>
    </>
  );
};

const HeaderRight = ({navigation, route, testID}: IProps) => {
  const searchQuery = useSearchSelector(selectSearchQuery);
  const searchOptions = useSearchSelector(selectSearchOptions);
  const isAuthorized = useSelector(selectUserAuthorized);
  const {filtersToApply} = route.params || {};
  const numberOfAppliedFilters = prepareNumberOfAppliedFilters({
    filters: filtersToApply,
    isAuthorized,
  });
  const styles = useThemeStyles(themeStyles);

  return (
    <View>
      <Button
        testID={testID}
        isIconOnlyButton
        // eslint-disable-next-line react/no-unstable-nested-components
        icon={textStyle => <Icon name="tune" size={24} style={textStyle} />}
        onPress={() => {
          navigation.navigate('Filter', {
            initialFilters: filtersToApply
              ? {
                  ...filtersToApply,
                  excludeVisited:
                    filtersToApply?.excludeVisited && isAuthorized,
                }
              : undefined,
            initialQuery: searchQuery,
            searchOptions: searchOptions,
          });
        }}
        theme="quarterlyGrey"
      />
      {numberOfAppliedFilters ? (
        <View style={styles.filtersBadge}>
          <Text style={styles.filterBadgeText}>{numberOfAppliedFilters}</Text>
        </View>
      ) : null}
    </View>
  );
};

export const screenOptions: ScreenOptions = props => ({
  headerTitle: () => <HeaderTitle />,
  headerRight: () => <HeaderRight testID="headerRight" {...props} />,
  header: CustomNavigationHeader,
  headerTitleAlign: 'left',
  headerStyle: {
    // @ts-ignore
    height: 64,
  },
});
