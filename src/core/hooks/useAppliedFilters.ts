import {useRoute, useNavigation} from '@react-navigation/native';
import {FILTERS_NAMES_ANAYLITICS_MAP, INITIAL_FILTERS} from 'core/constants';
import {IState} from 'core/store';
import {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  SearchScreenRouteProps,
  SearchScreenNavigationProps,
} from '../../screens/Search/types';
import {selectSearchFiltersItems, selectUserAuthorized} from '../selectors';
import {sendAnalyticsEvent} from '../actions';
import {prepareNumberOfAppliedFilters} from '../transformators/filters';

export const useAppliedFilters = () => {
  const {params} = useRoute<SearchScreenRouteProps>();

  const navigation = useNavigation<SearchScreenNavigationProps>();

  const {appliedFilters: filtersToApply} = params || {};

  const appliedFilters = useSelector((state: IState) =>
    selectSearchFiltersItems(state, filtersToApply),
  );

  const isAuthorized = useSelector(selectUserAuthorized);

  const numberOfAppliedFilters = prepareNumberOfAppliedFilters({
    filters: filtersToApply,
    isAuthorized,
  });

  const dispatch = useDispatch();

  const sendFilterRemoveEvent = useCallback(
    (filerName: string) => {
      dispatch(
        sendAnalyticsEvent({
          name: 'Filter_remove',
          data: {
            filter: FILTERS_NAMES_ANAYLITICS_MAP[filerName],
          },
        }),
      );
    },
    [dispatch],
  );

  const removeAppliedFilter = useCallback(
    (filterName: string) => {
      if (filtersToApply) {
        navigation.setParams({
          appliedFilters: {
            ...filtersToApply,
            [filterName]: INITIAL_FILTERS[filterName],
          },
        });

        sendFilterRemoveEvent(filterName);
      }
    },
    [filtersToApply, navigation, sendFilterRemoveEvent],
  );

  return {
    appliedFilters,
    numberOfAppliedFilters,
    removeAppliedFilter,
  };
};
