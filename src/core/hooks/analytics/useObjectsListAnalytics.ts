import { useCallback } from 'react';
import { analyticsService } from 'services/AnalyticsService';

export function useObjectsListAnalytics() {
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
    sendSelectCardEvent,
    sendSaveCardEvent,
    sendUnsaveCardEvent,
  };
}
