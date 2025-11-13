import { AnalyticScreensNames } from 'core/constants';
import { AnalyticsNavigationScreenNames } from 'core/types';
import { getCurrentRouteName } from 'services/NavigationService';

export function getAnalyticsNavigationScreenName(): AnalyticsNavigationScreenNames {
  const routeName = getCurrentRouteName();
  return AnalyticScreensNames?.[routeName] || 'unknown';
}
