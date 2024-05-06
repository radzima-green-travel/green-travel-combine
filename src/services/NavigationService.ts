import {
  NavigationState,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {MainNavigatorParamsList, TabNavigatorParamsList} from 'core/types';
import {reduce} from 'lodash';

export const navigationRef =
  createNavigationContainerRef<MainNavigatorParamsList>();

export function navigate(...args: Parameters<typeof navigationRef.navigate>) {
  navigationRef?.navigate(...args);
}

export function goBack() {
  navigationRef?.goBack();
}

export function getCurrentStateData() {
  if (navigationRef?.isReady()) {
    return navigationRef.getState();
  }
}

export function getCurrentRouteName() {
  if (navigationRef?.isReady()) {
    return navigationRef.getCurrentRoute()?.name || '';
  }

  return '';
}

export function getCurrentTabName() {
  const state = getCurrentStateData() as
    | NavigationState<MainNavigatorParamsList>
    | undefined;

  const currentTabName = reduce(
    state?.routes,
    (acc, route) => {
      if (route.name === 'TabNavigator' && route.state?.routeNames) {
        const tabRouteState =
          route.state as NavigationState<TabNavigatorParamsList>;
        return tabRouteState.routeNames[tabRouteState.index] || null;
      }

      return acc;
    },
    null as keyof TabNavigatorParamsList | null,
  );

  return currentTabName;
}
