import { ColorValue, ImageStyle, TextStyle, ViewStyle } from 'react-native';

interface ThemeViewStyle
  extends Omit<ViewStyle, 'backgroundColor' | 'borderColor'> {
  borderColor?: {
    light: ColorValue;
    dark: ColorValue;
  };
  backgroundColor?: {
    light: ColorValue;
    dark: ColorValue;
  };
}

interface ThemeTextStyle extends Omit<TextStyle, 'color'> {
  color?:
    | {
        light: ColorValue;
        dark: ColorValue;
      }
    | ColorValue;
}

interface ThemeImageStyle extends Omit<ImageStyle, 'backgroundColor'> {
  backgroundColor?: {
    light: ColorValue;
    dark: ColorValue;
  };
}

export type NamedThemeStyles<T> = {
  [P in keyof T]: ThemeViewStyle | ThemeTextStyle | ThemeImageStyle;
};
