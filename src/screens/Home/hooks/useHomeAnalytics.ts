import { sendAnalyticsEvent } from 'core/actions';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getScreenTimeSec } from 'core/helpers';

export function useHomeAnalytics() {
  const dispatch = useDispatch();

  const sendTrackPageLifeTimeEvent = useCallback(() => {
    const startTime = Date.now();

    return () => {
      const timeInSec = getScreenTimeSec(startTime, Date.now());

      dispatch(
        sendAnalyticsEvent({
          name: 'home_lifetime',
          data: { param_time_interval: timeInSec },
        }),
      );
    };
  }, [dispatch]);

  const sendMainScreenViewEvent = useCallback(() => {
    dispatch(sendAnalyticsEvent({ name: 'MainScreen_view' }));
  }, [dispatch]);

  const sendMainScreenNonGMObjectsViewEvent = useCallback(() => {
    dispatch(sendAnalyticsEvent({ name: 'MainScreen_non_GM_objects_view' }));
  }, [dispatch]);

  const sendMainScreenWeekObjectViewEvent = useCallback(
    (object_name: string, object_category: string) => {
      dispatch(
        sendAnalyticsEvent({
          name: 'MainScreen_week_object_view',
          data: { object_name, object_category },
        }),
      );
    },
    [dispatch],
  );

  const sendMainScreenWeekObjectBookmarksAddEvent = useCallback(
    (object_name: string, object_category: string) => {
      dispatch(
        sendAnalyticsEvent({
          name: 'MainScreen_week_object_bookmarks_add',
          data: { object_name, object_category },
        }),
      );
    },
    [dispatch],
  );

  const sendMainScreenRandomPlaceViewEvent = useCallback(
    (object_name: string, object_category: string) => {
      dispatch(
        sendAnalyticsEvent({
          name: 'MainScreen_random_place_view',
          data: { object_name, object_category },
        }),
      );
    },
    [dispatch],
  );

  const sendMainScreenWeekObjectBookmarksRemoveEvent = useCallback(
    (object_name: string, object_category: string) => {
      dispatch(
        sendAnalyticsEvent({
          name: 'MainScreen_week_object_bookmarks_remove',
          data: { object_name, object_category },
        }),
      );
    },
    [dispatch],
  );

  const sendMainScreenCategoryViewEvent = useCallback(
    (category: string) => {
      dispatch(
        sendAnalyticsEvent({
          name: 'MainScreen_category_view',
          data: { category },
        }),
      );
    },
    [dispatch],
  );

  return {
    sendTrackPageLifeTimeEvent,
    sendMainScreenViewEvent,
    sendMainScreenNonGMObjectsViewEvent,
    sendMainScreenWeekObjectViewEvent,
    sendMainScreenWeekObjectBookmarksAddEvent,
    sendMainScreenRandomPlaceViewEvent,
    sendMainScreenWeekObjectBookmarksRemoveEvent,
    sendMainScreenCategoryViewEvent,
  };
}
