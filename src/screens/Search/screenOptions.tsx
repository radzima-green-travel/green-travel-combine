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
import {Icon, CustomHeader, Button, BottomMenu} from 'atoms';
import {useSearchActions, useSearchSelector} from 'core/hooks';
import {SearchField, SearchOptionsBottomMenu} from 'molecules';
import {Portal} from '@gorhom/portal';
import {SearchOptions} from 'core/types';
import {Keyboard, Text, View} from 'react-native';
import {prepareNumberOfAppliedFilters} from 'core/transformators/filters';
import {useSelector} from 'react-redux';
import {useSearchAnalytics} from './hooks/useSearchAnalytics';
import {getAnalyticsNavigationScreenName} from 'core/helpers';

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
        renderIcon={textStyle => (
          <Icon name="tune" size={24} style={textStyle} />
        )}
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
            analytics: {
              fromScreenName: getAnalyticsNavigationScreenName(),
            },
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

export const screenOptions: ScreenOptions = props => {
  return {
    headerTitle: () => <HeaderTitle />,
    headerRight: () => <HeaderRight testID="headerRight" {...props} />,
    header: headerProps => (
      <CustomHeader withOverlay={false} {...headerProps} />
    ),
  };
};
