export type MainScreenViewEvent = {
  name: 'MainScreen_view';
  data?: {};
};
export type MainScreenNonGMObjectsViewEvent = {
  name: 'MainScreen_non_GM_objects_view';
  data?: {};
};

export type MainScreenWeekObjectViewEvent = {
  name: 'MainScreen_week_object_view';
  data: {
    object_name: string;
    object_category: string;
  };
};

export type MainScreenWeekObjectBookmarksAddEvent = {
  name: 'MainScreen_week_object_bookmarks_add';
  data: {
    object_name: string;
    object_category: string;
  };
};

export type MainScreenRandomPlaceViewEvent = {
  name: 'MainScreen_random_place_view';
  data: {
    object_name: string;
    object_category: string;
  };
};

export type MainScreenWeekObjectBookmarksRemoveEvent = {
  name: 'MainScreen_week_object_bookmarks_remove';
  data: {
    object_name: string;
    object_category: string;
  };
};

export type MainScreenCategoryViewEvent = {
  name: 'MainScreen_category_view';
  data: {
    category: string;
  };
};

export type MainScreenLifetimeEvent = {
  name: 'home_lifetime';
  data: {
    param_time_interval: number;
  };
};

export type MainScreenEvents =
  | MainScreenViewEvent
  | MainScreenNonGMObjectsViewEvent
  | MainScreenWeekObjectViewEvent
  | MainScreenWeekObjectBookmarksAddEvent
  | MainScreenRandomPlaceViewEvent
  | MainScreenWeekObjectBookmarksRemoveEvent
  | MainScreenCategoryViewEvent
  | MainScreenLifetimeEvent;
