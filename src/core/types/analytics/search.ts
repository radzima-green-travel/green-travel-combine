export type SearchViewEvent = {
  name: 'Search_view';
  data?: {};
};

export type SearchParametersViewEvent = {
  name: 'Search_parameters_view';
  data?: {};
};

export type SearchParameterOnEvent = {
  name: 'Search_parameter_on';
  data: {
    parameters: string[];
  };
};

export type SearchParametersCloseEvent = {
  name: 'Search_parameters_close';
  data: {
    parameters: string[];
  };
};

export type SearchHistoryItemRemoveEvent = {
  name: 'Search_history_item_remove';
  data: {
    object_name: string;
  };
};

export type SearchHistoryClearEvent = {
  name: 'Search_history_clear';
  data?: {};
};

export type SearchResultsItemClickEvent = {
  name: 'Search_and_Filters_results_item_click';
  data: {
    type: Array<'Search' | 'History' | 'Filtered objects'>;
  };
};

export type FilterRemoveEvent = {
  name: 'Filter_remove';
  data: {
    filter: string;
  };
};

export type SearchEvents =
  | SearchViewEvent
  | SearchParametersViewEvent
  | SearchParameterOnEvent
  | SearchParametersCloseEvent
  | SearchHistoryItemRemoveEvent
  | SearchHistoryClearEvent
  | SearchResultsItemClickEvent
  | FilterRemoveEvent;
