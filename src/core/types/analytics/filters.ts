import { AnalyticsNavigationScreenNames } from './common';

export type FiltersCategorySelectEvent = {
  name: 'Filters_category_select';
  data: {
    category: string;
  };
};

export type FiltersRegionSelectEvent = {
  name: 'Filters_region_select';
  data: {
    region: string;
  };
};

export type FiltersSettlementsViewEvent = {
  name: 'Filters_settlements_view';
  data: {
    regions_selected: string[];
  };
};

export type FiltersSettlementSelectEvent = {
  name: 'Filters_settlement_select';
  data: {
    settlement: string;
  };
};

export type FiltersSettlementsApplyEvent = {
  name: 'Filters_settlements_apply';
  data: {
    regions_selected: string[];
    settlements_selected: string[];
  };
};

export type FiltersSettlementsResetEvent = {
  name: 'Filters_settlements_reset';
  data: {
    regions_selected: string[];
    settlements_selected: string[];
  };
};

export type FiltersSettlementsSearchEvent = {
  name: 'Filters_settlements_search';
  data?: {};
};

export type FiltersSettlementsSearchClearEvent = {
  name: 'Filters_settlements_search_clear';
  data?: {};
};

export type FiltersDistanceEvent = {
  name: 'Filters_distance';
  data: {
    filter_by_distance: boolean;
  };
};

export type FiltersDistanceSetEvent = {
  name: 'Filters_distance_set';
  data: {
    distance: number;
  };
};

export type FiltersRatingSelectEvent = {
  name: 'Filters_rating_select';
  data: {
    rating: string;
  };
};

export type FiltersHideVisitedEvent = {
  name: 'Filters_hide_visited';
  data: {
    hide_visited: boolean;
  };
};

export type FiltersClearEvent = {
  name: 'Filters_clear';
  data: {
    categories_selected: string[];
    regions_selected: string[];
    settlements_selected: string[];
    distance: number;
    rating: string;
    hide_visit: boolean;
    filtered_objects_count: number;
  };
};

export type FiltersApplyEvent = {
  name: 'Filters_apply';
  data: {
    categories_selected: string[];
    regions_selected: string[];
    settlements_selected: string[];
    distance: number;
    rating: string;
    hide_visit: boolean;
    filtered_objects_count: number;
  };
};

export type FiltersViewEvent = {
  name: 'Filters_view';
  data: {
    from_screen_name: AnalyticsNavigationScreenNames;
  };
};

export type FiltersEvents =
  | FiltersCategorySelectEvent
  | FiltersRegionSelectEvent
  | FiltersSettlementsViewEvent
  | FiltersSettlementSelectEvent
  | FiltersSettlementsApplyEvent
  | FiltersSettlementsResetEvent
  | FiltersSettlementsSearchEvent
  | FiltersSettlementsSearchClearEvent
  | FiltersDistanceEvent
  | FiltersDistanceSetEvent
  | FiltersRatingSelectEvent
  | FiltersHideVisitedEvent
  | FiltersClearEvent
  | FiltersApplyEvent
  | FiltersViewEvent;
