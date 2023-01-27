import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export type ButtonThemes = 'green' | 'blackAndWhite' | 'bordered';

export interface ThemeData {
  container: StyleProp<ViewStyle>;
  disabled: StyleProp<ViewStyle>;
  active: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
  disabledText: StyleProp<TextStyle>;
}
