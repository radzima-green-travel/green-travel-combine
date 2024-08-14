import {isPlainObject, mapValues, has} from 'lodash';

import {
  StyleProp,
  ViewStyle,
  TextStyle,
  ColorSchemeName,
  Linking,
} from 'react-native';

import {SupportedLocales, TestIDs, LocationDTO} from 'core/types';

export const extractThemeStyles = (
  styles: Object,
  theme: ColorSchemeName,
): {[propName: string]: StyleProp<ViewStyle | TextStyle>} => {
  return mapValues(styles, value => {
    return isPlainObject(value) && (has(value, 'dark') || has(value, 'light'))
      ? value[theme!]
      : value;
  });
};

export const sanitizePhoneNumber = (phoneNumber: string) => {
  const plus = phoneNumber.startsWith('+') ? '+' : '';
  const digits = phoneNumber.replace(/\D/g, '');

  return `${plus}${digits}`;
};

export const removePunctuation = (input: string) => {
  const punctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~«»]/g;
  return input.replace(punctuation, '');
};

export function hexWithAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (isFinite(alpha)) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}

export async function tryOpenURL(url: string) {
  try {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn(`Don't know how to open URI: ${url}`);
    }
  } catch (e) {
    console.warn(e.message);
  }
}

export function isLocationExist(object: {location: LocationDTO | null}) {
  return Boolean(object?.location?.lat && object.location.lon);
}

export function getScreenTimeSec(startMs: number, endMs: number) {
  return Math.floor((endMs - startMs) / 1000);
}

export function composeTestID(
  testID: TestIDs | string,
  secondId: string | number,
) {
  return typeof secondId === 'string'
    ? `${testID}_${secondId}`
    : `${testID}_${secondId + 1}`;
}

export function getLanguageByLocale(lang: SupportedLocales | null) {
  if (lang === 'en') {
    return 'English';
  } else if (lang === 'ru') {
    return 'Русский';
  }

  return null;
}

export const createNumericArray = (length: number) => {
  return Array.from({length}, (_, index) => index + 1);
};
