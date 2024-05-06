import {AnalyticsModalNames, AnalyticsNavigationScreenNames} from './common';

export type FromScreenName =
  | AnalyticsNavigationScreenNames
  | AnalyticsModalNames;

export type AnalyticsAddInfoFieldsNames =
  | 'phone'
  | 'work_hours'
  | 'child_service'
  | 'upcoming_events'
  | 'sleep_place'
  | 'eat_place'
  | 'rent_service'
  | 'avg_visit_time';

export type ObjectScreenViewEvent = {
  name: 'ObjectScreen_view';
  data: {
    from_screen_name: FromScreenName;
    object_name: string;
  };
};
export type ObjectScreenCopyLocationLabelEvent = {
  name: 'ObjectScreen_copy_location_label_click';
  data: {
    object_name: string;
    object_category: string;
  };
};

export type ObjectScreenMarkVisitedEvent = {
  name: 'ObjectScreen_mark_visited_button_click';
  data: {
    object_name: string;
    object_category: string;
  };
};
export type ObjectScreenUnmarkVisitedEvent = {
  name: 'ObjectScreen_unmark_visited_button_click';
  data: {
    object_name: string;
    object_category: string;
  };
};
export type UnmarkModalUnmarkOptionClickEvent = {
  name: 'UnmarkModal_unmark_option_click';
  data?: {};
};

export type UnmarkModalCancelOptionClickEvent = {
  name: 'UnmarkModal_cancel_click';
  data?: {};
};
export type ObjectScreenAddInfoBannerClickEvent = {
  name: 'ObjectScreen_add_info_banner_click';
  data: {
    object_name: string;
    object_category: string;
    info_readiness_value: string;
  };
};

export type ObjectScreenOfficialSiteUrlClickEvent = {
  name: 'ObjectScreen_official_site_url_click';
  data: {
    object_name: string;
    object_category: string;
  };
};

export type ObjectScreenMorePhonesViewEvent = {
  name: 'ObjectScreen_more_phones_view';
  data: {
    object_name: string;
    object_category: string;
  };
};

export type ObjectScreenFullWorkHoursViewEvent = {
  name: 'ObjectScreen_full_work_hours_view';
  data: {
    object_name: string;
    object_category: string;
  };
};

export type ObjectScreenDescriptionShowMoreActionEvent = {
  name: 'ObjectScreen_description_show_more_action';
  data: {
    object_name: string;
    object_category: string;
  };
};

export type ObjectScreenDescriptionShowLessActionEvent = {
  name: 'ObjectScreen_description_show_less_action';
  data: {
    object_name: string;
    object_category: string;
  };
};

export type ObjectScreebDescriptionLinksClickEvent = {
  name: 'ObjectScreen_description_links_click';
  data: {
    object_name: string;
    object_category: string;
    link_text: string;
  };
};

export type ObjectScreenAddInfoButtonClickEvent = {
  name: 'ObjectScreen_add_info_button_click';
  data: {
    object_name: string;
    object_category: string;
    info_readiness_value: string;
    missed_fields: string[];
  };
};

export type ObjectScreenSleepPlaceMapViewEvent = {
  name: 'ObjectScreen_sleep_place_map_view';
  data: {
    object_name: string;
    object_category: string;
  };
};

export type ObjectScreenSleepPlaceSiteNavigateEvent = {
  name: 'ObjectScreen_sleep_place_site_navigate';
  data: {
    object_name: string;
    object_category: string;
  };
};

export type ObjectScreenEatPlaceMapViewEvent = {
  name: 'ObjectScreen_eat_place_map_view';
  data: {
    object_name: string;
    object_category: string;
  };
};

export type ObjectScreenEatPlaceSiteNavigateEvent = {
  name: 'ObjectScreen_eat_place_site_navigate';
  data: {
    object_name: string;
    object_category: string;
  };
};

export type ObjectScreenUpcomingEventSiteNavigateEvent = {
  name: 'ObjectScreen_upcoming_event_site_navigate';
  data: {
    object_name: string;
    object_category: string;
  };
};

export type ObjectScreenReportInaccuranceViewEvent = {
  name: 'Report_inaccurance_view';
  data: {
    object_name: string;
    object_category: string;
    from_screen_name: FromScreenName;
  };
};

export type ObjectScreenReportInaccuranceSendEvent = {
  name: 'Report_inaccurance_send';
  data: {
    object_name: string;
    object_category: string;
    from_screen_name: FromScreenName;
  };
};
export type ObjectScreenReportInaccuranceCloseEvent = {
  name: 'Report_inaccurance_close';
  data: {
    object_name: string;
    object_category: string;
    at_least_one_field_filled: boolean;
  };
};

export type ObjectScreenBelongsToNavigateEvent = {
  name: 'ObjectScreen_belongsto_navigate';
  data: {
    object_name: string;
    object_category: string;
    belongs_to_object_name: string;
    belongs_to_category: string;
  };
};

export type ObjectScreenActivitiesNavigateEvent = {
  name: 'ObjectScreen_activities_navigate';
  data: {
    object_name: string;
    object_category: string;
    activities_category: string;
  };
};

export type VisitedModalCloseEvent = {
  name: 'VisitedModal_close';
  data: {
    object_name: string;
    object_category: string;
    at_least_one_field_filled: boolean;
  };
};

export type VisitedModalSendEvent = {
  name: 'VisitedModal_send';
  data: {
    object_name: string;
    object_category: string;
    visited_rating: number;
    visited_avg_object_time: string;
  };
};

export type AddInfoModalViewEvent = {
  name: 'AddInfoModal_view';
  data: {
    object_name: string;
    object_category: string;
    from_screen_name: FromScreenName;
  };
};

export type AddInfoModalAnyFieldViewEvent = {
  name: 'AddInfoModal_any_field_view';
  data: {
    object_name: string;
    object_category: string;
    field_name: AnalyticsAddInfoFieldsNames;
  };
};

export type AddInfoModalSendAllEvent = {
  name: 'AddInfoModal_send_all';
  data: {
    object_name: string;
    object_category: string;
    not_empty_fields: AnalyticsAddInfoFieldsNames[];
  };
};

export type AddInfoModalAnyFieldInputCloseEvent = {
  name: 'AddInfoModal_any_field_input_close';
  data: {
    object_name: string;
    object_category: string;
    field_name: AnalyticsAddInfoFieldsNames;
    at_least_one_field_filled: boolean;
  };
};

export type AddInfoModalAnyFieldInputSubmitEvent = {
  name: 'AddInfoModal_any_field_input_submit';
  data: {
    object_name: string;
    object_category: string;
    field_name: AnalyticsAddInfoFieldsNames;
  };
};

export type AddInfoModalConfirmSaveNoButtonClickEvent = {
  name: 'AddInfoModal_confirm_save_no_button_click';
  data: {
    object_name: string;
    object_category: string;
    not_empty_fields: AnalyticsAddInfoFieldsNames[];
  };
};

export type AddInfoModalConfirmSaveYesButtonClickEvent = {
  name: 'AddInfoModal_confirm_save_yes_button_click';
  data: {
    object_name: string;
    object_category: string;
    not_empty_fields: AnalyticsAddInfoFieldsNames[];
  };
};

export type ObjectScreenShowOnMapButtonClickEvent = {
  name: 'ObjectScreen_show_on_map_button_click';
  data: {
    object_name: string;
    object_category: string;
  };
};

export type ObjectScreenBookmarksAddEvent = {
  name: 'ObjectScreen_bookmarks_add';
  data: {
    object_name: string;
    object_category: string;
  };
};

export type ObjectScreenBookmarksRemoveEvent = {
  name: 'ObjectScreen_bookmarks_remove';
  data: {
    object_name: string;
    object_category: string;
  };
};

export type ObjectScreenObjectShareEvent = {
  name: 'ObjectScreen_object_share';
  data: {
    object_name: string;
    object_category: string;
  };
};

export type ObjectDetailsEvents =
  | ObjectScreenViewEvent
  | ObjectScreenCopyLocationLabelEvent
  | ObjectScreenMarkVisitedEvent
  | ObjectScreenUnmarkVisitedEvent
  | UnmarkModalUnmarkOptionClickEvent
  | UnmarkModalCancelOptionClickEvent
  | ObjectScreenAddInfoBannerClickEvent
  | ObjectScreenOfficialSiteUrlClickEvent
  | ObjectScreenMorePhonesViewEvent
  | ObjectScreenFullWorkHoursViewEvent
  | ObjectScreenDescriptionShowMoreActionEvent
  | ObjectScreenDescriptionShowLessActionEvent
  | ObjectScreebDescriptionLinksClickEvent
  | ObjectScreenAddInfoButtonClickEvent
  | ObjectScreenSleepPlaceMapViewEvent
  | ObjectScreenSleepPlaceSiteNavigateEvent
  | ObjectScreenEatPlaceMapViewEvent
  | ObjectScreenEatPlaceSiteNavigateEvent
  | ObjectScreenUpcomingEventSiteNavigateEvent
  | ObjectScreenReportInaccuranceViewEvent
  | ObjectScreenReportInaccuranceSendEvent
  | ObjectScreenReportInaccuranceCloseEvent
  | ObjectScreenBelongsToNavigateEvent
  | ObjectScreenActivitiesNavigateEvent
  | VisitedModalCloseEvent
  | VisitedModalSendEvent
  | AddInfoModalViewEvent
  | AddInfoModalAnyFieldViewEvent
  | AddInfoModalSendAllEvent
  | AddInfoModalAnyFieldInputCloseEvent
  | AddInfoModalAnyFieldInputSubmitEvent
  | AddInfoModalConfirmSaveNoButtonClickEvent
  | AddInfoModalConfirmSaveYesButtonClickEvent
  | ObjectScreenShowOnMapButtonClickEvent
  | ObjectScreenBookmarksAddEvent
  | ObjectScreenBookmarksRemoveEvent
  | ObjectScreenObjectShareEvent;
