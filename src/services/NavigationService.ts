import {NavigationContainerRefWithCurrent} from '@react-navigation/native';

let navigationRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;

export const setNavigationRef = ref => (navigationRef = ref);

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
