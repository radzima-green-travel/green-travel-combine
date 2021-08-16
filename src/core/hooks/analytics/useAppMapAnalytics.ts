import {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {analyticsService} from 'services/AnalyticsService';
import {getScreenTimeSec} from 'core/helpers';

export function useAppMapAnalytics() {
  useFocusEffect(
    useCallback(() => {
      const startTime = Date.now();

      return () => {
        const timeInSec = getScreenTimeSec(startTime, Date.now());

        analyticsService.logEvent('map_lifetime', {
          param_time_interval: timeInSec,
        });
      };
    }, []),
  );
  useFocusEffect(
    useCallback(() => {
      analyticsService.logEvent('view_map_event');
    }, []),
  );
}
