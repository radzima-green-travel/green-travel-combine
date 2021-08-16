import {useCallback, useEffect, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {analyticsService} from 'services/AnalyticsService';
import {NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import {getScreenTimeSec} from 'core/helpers';

export function useDetailsPageHeaderAnalytics({
  name,
  category,
}: {
  name: string;
  category: string;
}) {
  const sendSaveObjectDeatailsEvent = useCallback(() => {
    analyticsService.logEvent('card_details_save_event', {
      param_card_name: name,
      param_card_category: category,
    });
  }, [category, name]);

  const sendUnsaveObjectDeatailsEvent = useCallback(() => {
    analyticsService.logEvent('card_details_unsave_event', {
      param_card_name: name,
      param_card_category: category,
    });
  }, [category, name]);

  return {
    sendSaveObjectDeatailsEvent,
    sendUnsaveObjectDeatailsEvent,
  };
}

export function useDetailsPageAnalytics({
  name,
  category,
}: {
  name: string;
  category: string;
}) {
  useFocusEffect(
    useCallback(() => {
      const startTime = Date.now();

      return () => {
        const timeInSec = getScreenTimeSec(startTime, Date.now());

        analyticsService.logEvent('card_details_lifetime', {
          param_card_name: name,
          param_card_category: category,
          param_time_interval: timeInSec,
        });
      };
    }, [category, name]),
  );

  useFocusEffect(
    useCallback(() => {
      analyticsService.logEvent('view_details_event', {
        param_card_name: name,
        param_card_category: category,
      });
    }, [category, name]),
  );

  useEffect(() => {
    return () => {
      analyticsService.logEvent('card_details_close_event', {
        param_card_name: name,
        param_card_category: category,
      });
    };
  }, [category, name]);

  const sendOpenMapEvent = useCallback(() => {
    analyticsService.logEvent('card_details_map_event', {
      param_card_name: name,
      param_card_category: category,
    });
  }, [category, name]);

  const sendSwitchPhotosEvent = useCallback(() => {
    analyticsService.logEvent('card_details_switch_photo', {
      param_card_name: name,
      param_card_category: category,
    });
  }, [category, name]);

  const isScrollEventFired = useRef(false);
  const sendScrollEvent = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isScrollEventFired.current) {
        return;
      }

      const {layoutMeasurement, contentOffset, contentSize} = e.nativeEvent;
      const isCloseToBottom =
        layoutMeasurement.height + contentOffset.y >= contentSize.height;

      if (isCloseToBottom) {
        isScrollEventFired.current = true;

        analyticsService.logEvent('card_details_scroll', {
          param_card_name: name,
          param_card_category: category,
        });
      }
    },
    [category, name],
  );

  return {
    sendOpenMapEvent,
    sendSwitchPhotosEvent,
    sendScrollEvent,
  };
}
