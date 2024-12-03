type TabEvents =
  | 'navi_bookmarks_event'
  | 'navi_home_event'
  | 'navi_map_event'
  | 'navi_profile_event';
type ScreenViewEvents =
  | 'view_home_event'
  | 'view_map_event'
  | 'view_bookmarks_event'
  | 'view_details_event';
type HomeEvents =
  | 'home_card_event'
  | 'home_save_card_event'
  | 'home_unsave_card_event'
  | 'home_see_all_event';
type BookmarksEvents = 'saved_category_event' | 'saved_card_event';

type ObjectDetailsEvents =
  | 'card_details_save_event'
  | 'card_details_unsave_event'
  | 'card_details_map_event'
  | 'card_details_close_event'
  | 'card_details_scroll'
  | 'card_details_switch_photo';

type ScreenTimeEvents =
  | 'card_details_lifetime'
  | 'home_lifetime'
  | 'map_lifetime';

export type Events =
  | TabEvents
  | ScreenViewEvents
  | HomeEvents
  | BookmarksEvents
  | ObjectDetailsEvents
  | ScreenTimeEvents;

export type AnalyticsNavigationScreenNames =
  | 'ObjectScreen'
  | 'ObjectListScreen'
  | 'BookmarksListScreen'
  | 'HomeScreen'
  | 'AppMapScreen'
  | 'unknown'
  | 'DeepLink'
  | 'SearchAndFiltersScreen';

export type AnalyticsModalNames = 'AddInfoModal' | 'VisitedModal';
