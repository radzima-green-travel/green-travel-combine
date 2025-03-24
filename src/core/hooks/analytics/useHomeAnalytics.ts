import {useCallback, useRef} from 'react';
import {ScrollView} from 'react-native';
import {useScrollToTop, useFocusEffect} from '@react-navigation/native';
import {analyticsService} from 'services/AnalyticsService';
import {getScreenTimeSec} from 'core/helpers';

export function useHomeAnalytics() {
  const listRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      const startTime = Date.now();

      return () => {
        const timeInSec = getScreenTimeSec(startTime, Date.now());

        analyticsService.logEvent('home_lifetime', {
          param_time_interval: timeInSec,
        });
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      analyticsService.logEvent('view_home_event');
    }, []),
  );

  useScrollToTop(
    useRef({
      scrollToTop: () => {
        listRef.current?.scrollTo({y: 0, x: 0});
      },
    }),
  );

  const sendSelectCardEvent = useCallback(
    (cardName: string, categoryName: string) => {
      analyticsService.logEvent('home_card_event', {
        param_card_name: cardName,
        param_card_category: categoryName,
      });
    },
    [],
  );

  const sendSaveCardEvent = useCallback(
    (cardName: string, categoryName: string) => {
      analyticsService.logEvent('home_save_card_event', {
        param_card_name: cardName,
        param_card_category: categoryName,
      });
    },
    [],
  );

  const sendUnsaveCardEvent = useCallback(
    (cardName: string, categoryName: string) => {
      analyticsService.logEvent('home_unsave_card_event', {
        param_card_name: cardName,
        param_card_category: categoryName,
      });
    },
    [],
  );

  return {
    listRef,
    sendSelectCardEvent,
    sendSaveCardEvent,
    sendUnsaveCardEvent,
  };
}
