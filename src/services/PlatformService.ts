import {Platform, Dimensions} from 'react-native';

const {OS} = Platform;

export const isIOS = OS === 'ios';
export const isAndroid = OS === 'android';

export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const WINDOW_WIDTH = Dimensions.get('window').width;

export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const SCREEN_WIDTH = Dimensions.get('screen').width;

let keyboardHeight: number | null = null;

export const getDeviceKeyuboardHeight = () => {
  return keyboardHeight;
};

export const setDeviceKeyboardHeight = (height: number) => {
  keyboardHeight = height;
};
