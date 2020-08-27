import {isPlainObject, mapValues, has} from 'lodash';

import {StyleProp, ViewStyle, TextStyle, ColorSchemeName} from 'react-native';

export const extractThemeStyles = (
  styles: Object,
  theme: ColorSchemeName,
): {[propName: string]: StyleProp<ViewStyle | TextStyle>} => {
  return mapValues(styles, (value) => {
    return isPlainObject(value) && (has(value, 'dark') || has(value, 'light'))
      ? value[theme!]
      : value;
  });
};
