import {useNavigation, useRoute} from '@react-navigation/native';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  SearchScreenNavigationProps,
  SearchScreenRouteProps,
} from '../../screens/Search/types';
import {getAnalyticsNavigationScreenName} from '../helpers';
import {
  selectSearchInputValue,
  selectSearchOptions,
  selectUserAuthorized,
} from '../selectors';
import {SearchOptions} from '../types';
import {useAppliedFilters} from './useAppliedFilters';
import {useSearchActions} from './useSearchActions';
import {useSearchSelector} from './useSearchSelector';

export const useSearchHeader = () => {
  const dispatch = useDispatch();
  const {setSearchInputValue: setSearchInputValueAction, setSearchOptions} =
    useSearchActions();

  const searchOptions = useSearchSelector(selectSearchOptions);
  const searchInputValue = useSearchSelector(selectSearchInputValue);
  const isAuthorized = useSelector(selectUserAuthorized);

  const {appliedFilters, removeAppliedFilter, numberOfAppliedFilters} =
    useAppliedFilters();

  const {params} = useRoute<SearchScreenRouteProps>();

  const {appliedFilters: filtersToApply} = params || {};

  const setSearchInputValue = useCallback(
    (text: string) => {
      dispatch(setSearchInputValueAction(text));
    },
    [dispatch, setSearchInputValueAction],
  );

  const clearSearchInputValue = useCallback(() => {
    setSearchInputValue('');
  }, [setSearchInputValue]);

  const updateSearchOptions = useCallback(
    (options: SearchOptions) => {
      dispatch(setSearchOptions(options));
    },
    [dispatch, setSearchOptions],
  );

  const navigation = useNavigation<SearchScreenNavigationProps>();

  const onFilterButtonPress = useCallback(() => {
    navigation.navigate('Filter', {
      initialFilters: filtersToApply
        ? {
            ...filtersToApply,
            excludeVisited: filtersToApply?.excludeVisited && isAuthorized,
          }
        : undefined,
      initialQuery: searchInputValue,
      searchOptions: searchOptions,
      analytics: {
        fromScreenName: getAnalyticsNavigationScreenName(),
      },
      onApply: filters => {
        navigation.setParams({appliedFilters: filters});
      },
    });
  }, [
    filtersToApply,
    isAuthorized,
    navigation,
    searchOptions,
    searchInputValue,
  ]);

  return {
    searchInputValue,
    setSearchInputValue,
    clearSearchInputValue,

    searchOptions,
    updateSearchOptions,

    numberOfAppliedFilters,
    appliedFilters,
    removeAppliedFilter,
    onFilterButtonPress,
  };
};
