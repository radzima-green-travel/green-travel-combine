import {useRoute} from '@react-navigation/native';
import {sendAnalyticsEvent} from 'core/actions';
import {
  selectActiveFilters,
  selectFiltersCategories,
  selectFiltersRegions,
  selectFiltersTotal,
  selectSettlements,
} from 'core/selectors';
import {CategoryFilterItem, SpotItem} from 'core/types';
import {map, compact, find} from 'lodash';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FiltersRouteProps} from '../types';
import {useStaticCallback} from 'react-redux-help-kit';

export function useFiltersAnalytics() {
  const dispatch = useDispatch();

  const regionsList = useSelector(selectFiltersRegions);
  const categoriesList = useSelector(selectFiltersCategories);
  const settlementsList = useSelector(selectSettlements);
  const activeFilters = useSelector(selectActiveFilters);
  const total = useSelector(selectFiltersTotal);
  const {
    params: {
      analytics: {fromScreenName},
    },
  } = useRoute<FiltersRouteProps>();

  const getActiveCategories = useCallback(
    () =>
      map(activeFilters.categories, categoryId => {
        return find(categoriesList, {id: categoryId})?.analyticsMetadata.name;
      }),
    [categoriesList, activeFilters.categories],
  );

  const getActiveRegions = useCallback(() => {
    return map(activeFilters.regions, regionId => {
      return find(regionsList, {id: regionId})?.analyticsMetadata.value;
    });
  }, [regionsList, activeFilters.regions]);

  const getActiveSettlements = useCallback(
    () =>
      map(activeFilters.municipalities, settlementId => {
        return find(settlementsList, {id: settlementId})?.analyticsMetadata
          .value;
      }),
    [settlementsList, activeFilters.municipalities],
  );

  const getAppliedFiltersAnalyticsData = useStaticCallback(() => {
    return {
      categories_selected: compact(getActiveCategories()),
      regions_selected: compact(getActiveRegions()),
      settlements_selected: compact(getActiveSettlements()),
      distance: activeFilters.distance.isOn ? activeFilters.distance.value : 0,
      rating: activeFilters.googleRating,
      hide_visit: activeFilters.excludeVisited,
      filtered_objects_count: total || 0,
    };
  }, [
    activeFilters.distance.isOn,
    activeFilters.distance.value,
    activeFilters.excludeVisited,
    activeFilters.googleRating,
    getActiveCategories,
    getActiveRegions,
    getActiveSettlements,
    total,
  ]);

  const sendFiltersViewEvent = useCallback(() => {
    dispatch(
      sendAnalyticsEvent({
        name: 'Filters_view',
        data: {
          from_screen_name: fromScreenName,
        },
      }),
    );
  }, [dispatch, fromScreenName]);

  const sendFiltersCategorySelectEvent = useCallback(
    (category: CategoryFilterItem) => {
      if (!activeFilters.categories.includes(category.id)) {
        dispatch(
          sendAnalyticsEvent({
            name: 'Filters_category_select',
            data: {category: category.analyticsMetadata.name},
          }),
        );
      }
    },
    [activeFilters.categories, dispatch],
  );

  const sendFiltersRegionSelectEvent = useCallback(
    (region: SpotItem) => {
      if (!activeFilters.regions.includes(region.id)) {
        dispatch(
          sendAnalyticsEvent({
            name: 'Filters_region_select',
            data: {region: region.analyticsMetadata.value},
          }),
        );
      }
    },
    [activeFilters.regions, dispatch],
  );

  const sendFiltersSettlementsViewEvent = useCallback(() => {
    dispatch(
      sendAnalyticsEvent({
        name: 'Filters_settlements_view',
        data: {
          regions_selected: getAppliedFiltersAnalyticsData().regions_selected,
        },
      }),
    );
  }, [dispatch, getAppliedFiltersAnalyticsData]);

  const sendFilterDistanceEvent = useCallback(
    (isOn: boolean) => {
      dispatch(
        sendAnalyticsEvent({
          name: 'Filters_distance',
          data: {filter_by_distance: isOn},
        }),
      );
    },
    [dispatch],
  );

  const sendFilterDistanceSetEvent = useCallback(
    (distance: number) => {
      dispatch(
        sendAnalyticsEvent({
          name: 'Filters_distance_set',
          data: {distance},
        }),
      );
    },
    [dispatch],
  );

  const sendFilterRatingSelectEvent = useCallback(
    (rating: string) => {
      dispatch(
        sendAnalyticsEvent({
          name: 'Filters_rating_select',
          data: {rating: rating === 'Any' ? rating : rating + '+'},
        }),
      );
    },
    [dispatch],
  );

  const sendFilterHideVisitedEvent = useCallback(
    (hideVisited: boolean) => {
      dispatch(
        sendAnalyticsEvent({
          name: 'Filters_hide_visited',
          data: {hide_visited: hideVisited},
        }),
      );
    },
    [dispatch],
  );

  const sendFilterClearEvent = useCallback(() => {
    dispatch(
      sendAnalyticsEvent({
        name: 'Filters_clear',
        data: getAppliedFiltersAnalyticsData(),
      }),
    );
  }, [dispatch, getAppliedFiltersAnalyticsData]);

  const sendFilterApplyEvent = useCallback(() => {
    dispatch(
      sendAnalyticsEvent({
        name: 'Filters_apply',
        data: getAppliedFiltersAnalyticsData(),
      }),
    );
  }, [dispatch, getAppliedFiltersAnalyticsData]);

  return {
    sendFiltersCategorySelectEvent,
    sendFiltersRegionSelectEvent,
    sendFiltersSettlementsViewEvent,
    sendFilterDistanceEvent,
    sendFilterDistanceSetEvent,
    sendFilterRatingSelectEvent,
    sendFilterHideVisitedEvent,
    sendFilterClearEvent,
    sendFilterApplyEvent,
    sendFiltersViewEvent,
    getAppliedFiltersAnalyticsData,
  };
}
