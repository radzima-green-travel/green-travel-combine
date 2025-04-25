import {
  selectSearchInputValue,
  selectSearchQuery,
  selectUserAuthorized,
  selectSearchOptions,
} from 'core/selectors';
import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {themeStyles} from './styles';
import {useBottomMenu, useThemeStyles} from 'core/hooks';
import {Icon, CustomHeader, Button, BottomMenu} from 'atoms';
import {useSearchActions, useSearchSelector} from 'core/hooks';
import {SearchField, SearchOptionsBottomMenu} from 'molecules';
import {Portal} from '@gorhom/portal';
import {
  RouteQueryParams,
  SearchFilters,
  SearchOptions,
  ScreenOptions,
} from 'core/types';
import {Keyboard, Text, View} from 'react-native';
import {prepareNumberOfAppliedFilters} from 'core/transformators/filters';
import {useSelector} from 'react-redux';
import {useSearchAnalytics} from './hooks/useSearchAnalytics';
import {getAnalyticsNavigationScreenName} from 'core/helpers';
import {Link, useLocalSearchParams} from 'expo-router';
import {base64} from 'core/helpers/encodingUtils';
import {serializeRouteParams} from 'core/helpers/routerUtils';

const HeaderTitle = () => {
  const dispatch = useDispatch();
  const {setSearchInputValue, setSearchOptions} = useSearchActions();
  const {
    sendSearchParameterOnEvent,
    sendSearchParametersCloseEvent,
    sendSearchParametersViewEvent,
  } = useSearchAnalytics();
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
        sendSearchParametersViewEvent();
      }
    },
    [setInputValue, openMenu, sendSearchParametersViewEvent],
  );

  const updateSearchOptions = useCallback(
    (options: SearchOptions) => {
      dispatch(setSearchOptions(options));

      sendSearchParameterOnEvent(options);
    },
    [dispatch, sendSearchParameterOnEvent, setSearchOptions],
  );

  return (
    <>
      <SearchField
        testID="headerSearchbar"
        containerStyle={styles.headerTitleContainer}
        value={inputValue}
        autoFocus
        onChange={setInputValue}
        filterActionTypeEnabled
        onRightButtonPress={onRightButtonPress}
      />
      <Portal>
        <BottomMenu
          onHideEnd={sendSearchParametersCloseEvent}
          testID={'bottomMenu'}
          withBackdrop
          {...bottomMenuProps}>
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

const HeaderRight = () => {
  const searchQuery = useSearchSelector(selectSearchQuery);
  const searchOptions = useSearchSelector(selectSearchOptions);
  const isAuthorized = useSelector(selectUserAuthorized);
  const searchParams = useLocalSearchParams<RouteQueryParams.Search>();

  const filtersToApply = base64(
    searchParams.filtersToApply,
  ).toMaybeObject<SearchFilters>();

  const numberOfAppliedFilters = prepareNumberOfAppliedFilters({
    filters: filtersToApply || undefined,
    isAuthorized,
  });
  const styles = useThemeStyles(themeStyles);

  const testID = 'headerRight';

  const {initialFilters, initialQuery} = {
    initialFilters: filtersToApply
      ? {
          ...filtersToApply,
          excludeVisited: filtersToApply?.excludeVisited && isAuthorized,
        }
      : undefined,
    initialQuery: searchQuery,
  };

  return (
    <View>
      <Link
        href={{
          pathname: '/filter',
          params: serializeRouteParams({
            initialFilters,
            initialQuery,
            searchOptions,
            fromRouteName: getAnalyticsNavigationScreenName(),
          }),
        }}
        asChild>
        <Button
          testID={testID}
          isIconOnlyButton
          renderIcon={textStyle => (
            <Icon name="tune" size={24} style={textStyle} />
          )}
          theme="quarterlyGrey"
        />
      </Link>
      {numberOfAppliedFilters ? (
        <View style={styles.filtersBadge}>
          <Text style={styles.filterBadgeText}>{numberOfAppliedFilters}</Text>
        </View>
      ) : null}
    </View>
  );
};

export const screenOptions: ScreenOptions = {
  headerTitle: () => <HeaderTitle />,
  headerRight: () => <HeaderRight />,
  header: headerProps => <CustomHeader withOverlay={false} {...headerProps} />,
};
