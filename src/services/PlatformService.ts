import {Platform, Dimensions} from 'react-native';

const {OS} = Platform;

export const isIOS = OS === 'ios';
export const isAndroid = OS === 'android';

export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const WINDOW_WIDTH = Dimensions.get('window').width;

export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const SCREEN_WIDTH = Dimensions.get('screen').width;

export function selectForPlatform<T>(
  forIOS?: T,
  forAndroid?: T,
): T | undefined {
  return Platform.select<T>({ios: forIOS, android: forAndroid});
}
