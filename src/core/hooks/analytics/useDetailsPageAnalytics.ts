import {useCallback, useMemo, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {analyticsService} from 'services/AnalyticsService';
import {selectObjectDetails} from 'core/selectors';
import {getScreenTimeSec} from 'core/helpers';
import {useObjectDetailsSelector} from 'core/hooks';

export function useDetailsPageAnalytics() {
  const data = useObjectDetailsSelector(selectObjectDetails);

  const analyticsData = useMemo(() => {
    return data
      ? {
          param_card_name: data.name,
          param_card_category: data.category.name,
        }
      : null;
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      const startTime = Date.now();

      return () => {
        const timeInSec = getScreenTimeSec(startTime, Date.now());
        if (analyticsData) {
          analyticsService.logEvent('card_details_lifetime', {
            ...analyticsData,
            param_time_interval: timeInSec,
          });
        }
      };
    }, [analyticsData]),
  );

  const sendSwitchPhotosEvent = useCallback(() => {
    if (analyticsData) {
      analyticsService.logEvent('card_details_switch_photo', analyticsData);
    }
  }, [analyticsData]);

  const isScrollEventFired = useRef(false);

  const sendScrollEvent = useCallback(
    (isScrollCloseToBottom: boolean) => {
      if (isScrollEventFired.current || !analyticsData) {
        return;
      }

      if (isScrollCloseToBottom) {
        isScrollEventFired.current = true;
        analyticsService.logEvent('card_details_scroll', analyticsData);
      }
    },
    [analyticsData],
  );

  return {
    sendSwitchPhotosEvent,
    sendScrollEvent,
  };
}
