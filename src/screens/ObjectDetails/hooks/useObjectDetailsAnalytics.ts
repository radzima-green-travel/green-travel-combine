import {sendAnalyticsEvent} from 'core/actions/appConfiguration';
import {useCallback, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {selectObjectDetails} from 'core/selectors';
import {useObjectDetailsSelector} from 'core/hooks';
import {getObjectDetailsAnalyticsIncompleteFieldName} from 'core/helpers';
import {map} from 'lodash';
import {useLocalSearchParams} from 'expo-router';
import {RouteQueryParams} from 'core/types';
import {FromScreenName} from 'core/types/analytics/objectDetails';

export function useObjectDetailsAnalytics() {
  const dispatch = useDispatch();
  const {fromScreenName} =
    useLocalSearchParams<RouteQueryParams.ObjectDetails>();

  const data = useObjectDetailsSelector(selectObjectDetails);

  const {analyticsMetadata, category} = data || {};

  const sendObjectScreenViewEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'ObjectScreen_view',
          data: {
            from_screen_name: (fromScreenName || 'DeepLink') as FromScreenName,
            object_name: analyticsMetadata.name,
          },
        }),
      );
    }
  }, [fromScreenName, analyticsMetadata, dispatch]);

  const sendLocationLabelClickEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'ObjectScreen_copy_location_label_click',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendMarkVisitedButtonClickEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'ObjectScreen_mark_visited_button_click',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendUnmarkVisitedButtonClickEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'ObjectScreen_unmark_visited_button_click',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendUnmarkOptionClickEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'UnmarkModal_unmark_option_click',
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendCancelOptionClickEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'UnmarkModal_cancel_click',
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendAddInfoBannerClickEvent = useCallback(() => {
    if (analyticsMetadata && category) {
      dispatch(
        sendAnalyticsEvent({
          name: 'ObjectScreen_add_info_banner_click',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata.categoryName,
            info_readiness_value: `${category.percentageOfCompletion}%`,
          },
        }),
      );
    }
  }, [analyticsMetadata, category, dispatch]);

  const sendOfficialSiteUrlClickEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'ObjectScreen_official_site_url_click',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendMorePhonesViewEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'ObjectScreen_more_phones_view',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendFullWorkHoursViewEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'ObjectScreen_full_work_hours_view',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendDescriptionShowMoreClickEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'ObjectScreen_description_show_more_action',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendDescriptionShowLessClickEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'ObjectScreen_description_show_less_action',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendDescriptionLicksClickEvent = useCallback(
    (linkText: string) => {
      if (analyticsMetadata) {
        dispatch(
          sendAnalyticsEvent({
            name: 'ObjectScreen_description_links_click',
            data: {
              object_name: analyticsMetadata.name,
              object_category: analyticsMetadata?.categoryName,
              link_text: linkText,
            },
          }),
        );
      }
    },
    [analyticsMetadata, dispatch],
  );

  const sendAddInfoButtonClickEvent = useCallback(() => {
    if (analyticsMetadata && category) {
      dispatch(
        sendAnalyticsEvent({
          name: 'ObjectScreen_add_info_button_click',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
            info_readiness_value: `${category.percentageOfCompletion}%`,
            missed_fields: map(
              category.incompleteFieldsNames,
              getObjectDetailsAnalyticsIncompleteFieldName,
            ),
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch, category]);

  const sendSleepPlaceMapViewEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'ObjectScreen_sleep_place_map_view',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendSleepPlaceSiteNavigateEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'ObjectScreen_sleep_place_site_navigate',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendEatPlaceMapViewEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'ObjectScreen_eat_place_map_view',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendEatPlaceSiteNavigateEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'ObjectScreen_eat_place_site_navigate',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendUpcomingEventSiteNavigateEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'ObjectScreen_upcoming_event_site_navigate',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const reportInnacuranceFieldValue = useRef<string | null>('');

  const onReportInnacuranceFieldValueChange = useCallback((value: string) => {
    reportInnacuranceFieldValue.current = value;
  }, []);

  const sendReportInaccuranceViewEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'Report_inaccurance_view',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
            from_screen_name: 'ObjectScreen',
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendReportInaccuranceSendEvent = useCallback(() => {
    if (analyticsMetadata) {
      reportInnacuranceFieldValue.current = null;
      dispatch(
        sendAnalyticsEvent({
          name: 'Report_inaccurance_send',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
            from_screen_name: 'ObjectScreen',
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendReportInaccuranceCloseEvent = useCallback(() => {
    if (analyticsMetadata && reportInnacuranceFieldValue.current !== null) {
      dispatch(
        sendAnalyticsEvent({
          name: 'Report_inaccurance_close',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
            at_least_one_field_filled: Boolean(
              reportInnacuranceFieldValue.current,
            ),
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendBelongsToNavigateEvent = useCallback(
    ({
      objectName,
      categoryName,
    }: {
      objectName: string;
      categoryName: string;
    }) => {
      if (analyticsMetadata) {
        dispatch(
          sendAnalyticsEvent({
            name: 'ObjectScreen_belongsto_navigate',
            data: {
              object_name: analyticsMetadata.name,
              object_category: analyticsMetadata?.categoryName,
              belongs_to_object_name: objectName,
              belongs_to_category: categoryName,
            },
          }),
        );
      }
    },
    [analyticsMetadata, dispatch],
  );

  const sendActivitiesNavigateEvent = useCallback(
    (categoryName: string) => {
      if (analyticsMetadata) {
        dispatch(
          sendAnalyticsEvent({
            name: 'ObjectScreen_activities_navigate',
            data: {
              object_name: analyticsMetadata.name,
              object_category: analyticsMetadata?.categoryName,
              activities_category: categoryName,
            },
          }),
        );
      }
    },
    [analyticsMetadata, dispatch],
  );

  const sendShowOnMapButtonClickEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'ObjectScreen_show_on_map_button_click',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendBookmarksAddEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'ObjectScreen_bookmarks_add',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendBookmarksRemoveEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'ObjectScreen_bookmarks_remove',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendObjectShareEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'ObjectScreen_object_share',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  return {
    sendObjectScreenViewEvent,
    sendLocationLabelClickEvent,
    sendMarkVisitedButtonClickEvent,
    sendUnmarkVisitedButtonClickEvent,
    sendUnmarkOptionClickEvent,
    sendCancelOptionClickEvent,
    sendAddInfoBannerClickEvent,
    sendOfficialSiteUrlClickEvent,
    sendMorePhonesViewEvent,
    sendFullWorkHoursViewEvent,
    sendDescriptionShowMoreClickEvent,
    sendDescriptionShowLessClickEvent,
    sendDescriptionLicksClickEvent,
    sendAddInfoButtonClickEvent,
    sendSleepPlaceMapViewEvent,
    sendSleepPlaceSiteNavigateEvent,
    sendEatPlaceMapViewEvent,
    sendEatPlaceSiteNavigateEvent,
    sendUpcomingEventSiteNavigateEvent,
    onReportInnacuranceFieldValueChange,
    sendReportInaccuranceViewEvent,
    sendReportInaccuranceSendEvent,
    sendReportInaccuranceCloseEvent,
    sendBelongsToNavigateEvent,
    sendActivitiesNavigateEvent,
    sendShowOnMapButtonClickEvent,
    sendBookmarksAddEvent,
    sendBookmarksRemoveEvent,
    sendObjectShareEvent,
  };
}
