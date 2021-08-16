import {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {analyticsService} from 'services/AnalyticsService';

export function useBookmarksAnalytics() {
  useFocusEffect(
    useCallback(() => {
      analyticsService.logEvent('view_bookmarks_event');
    }, []),
  );

  const sendSelectSavedCategoryEvent = useCallback((categoryName: string) => {
    analyticsService.logEvent('saved_category_event', {
      param_card_name: categoryName,
    });
  }, []);

  return {
    sendSelectSavedCategoryEvent,
  };
}
