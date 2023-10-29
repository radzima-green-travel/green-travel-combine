import {useCallback, useEffect, useMemo, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {analyticsService} from 'services/AnalyticsService';
import {getScreenTimeSec} from 'core/helpers';
import {useObject} from '../useObject';

export function useDetailsPageHeaderAnalytics(objectId: string) {
  const data = useObject(objectId);

  const analyticsData = useMemo(() => {
    return data
      ? {
          param_card_name: data.name,
          param_card_category: data.category.name,
        }
      : null;
  }, [data]);

  const sendSaveObjectDeatailsEvent = useCallback(() => {
    if (analyticsData) {
      analyticsService.logEvent('card_details_save_event', analyticsData);
    }
  }, [analyticsData]);

  const sendUnsaveObjectDeatailsEvent = useCallback(() => {
    if (analyticsData) {
      analyticsService.logEvent('card_details_unsave_event', analyticsData);
    }
  }, [analyticsData]);

  return {
    sendSaveObjectDeatailsEvent,
    sendUnsaveObjectDeatailsEvent,
  };
}

export function useDetailsPageAnalytics(objectId: string) {
  const data = useObject(objectId);

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

  useFocusEffect(
    useCallback(() => {
      if (analyticsData) {
        analyticsService.logEvent('view_details_event', analyticsData);
      }
    }, [analyticsData]),
  );

  useEffect(() => {
    return () => {
      if (analyticsData) {
        analyticsService.logEvent('card_details_close_event', analyticsData);
      }
    };
  }, [analyticsData]);

  const sendOpenMapEvent = useCallback(() => {
    if (analyticsData) {
      analyticsService.logEvent('card_details_map_event', analyticsData);
    }
  }, [analyticsData]);

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
    sendOpenMapEvent,
    sendSwitchPhotosEvent,
    sendScrollEvent,
  };
}
