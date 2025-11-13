import { FONTS_PRESETS } from 'assets';
import { useWindowDimensions } from 'react-native';
import { interpolate, Extrapolation } from 'react-native-reanimated';

export const useColoredWidgetDynamicStyles = () => {
  const { width: windowWidth } = useWindowDimensions();

  const { fontSize: defaultFontSize, lineHeight: defaultLineHeight } =
    FONTS_PRESETS.footnoteBold;

  const lineHeightRatio = defaultLineHeight / defaultFontSize;

  const fontSizeStyle = {
    fontSize: interpolate(
      windowWidth,
      [350, 360, 375, 991, 992],
      [12, 13, defaultFontSize, defaultFontSize, 16],
      Extrapolation.CLAMP,
    ),
    lineHeight: interpolate(
      windowWidth,
      [350, 360, 375, 991, 992],
      [
        12 * lineHeightRatio,
        13 * lineHeightRatio,
        defaultLineHeight,
        defaultLineHeight,
        16 * lineHeightRatio,
      ],
      Extrapolation.CLAMP,
    ),
  };

  const cardHeightStyle = {
    ...(windowWidth >= 768 ? { height: 280 } : { aspectRatio: 154 / 136 }),
  };

  const maxFontSizeMultiplier = interpolate(
    windowWidth,
    [350, 360, 375, 430, 500, 700],
    [1, 1, 1, 1.2, 1.7, 3],
    Extrapolation.CLAMP,
  );

  return {
    fontSizeStyle,
    cardHeightStyle,
    maxFontSizeMultiplier,
  };
};
