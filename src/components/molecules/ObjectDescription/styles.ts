import {COLORS, FONTS_STYLES, FONTS_PRESETS} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
import {hexWithAlpha} from 'core/helpers';
import {createThemeStyles} from 'core/helpers/styles';
import type {LinearGradientProps} from 'expo-linear-gradient';

export const TEXT_COLLAPSE_HEIGHT = 192;

export const themeStyles = createThemeStyles({
  container: {
    marginHorizontal: PADDING_HORIZONTAL,
    padding: PADDING_HORIZONTAL,
    borderRadius: 21,
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
    marginBottom: PADDING_HORIZONTAL,
  },

  descriptionContainer: {
    height: TEXT_COLLAPSE_HEIGHT,
    overflow: 'hidden',
  },

  descriptionContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  headline: {
    ...FONTS_STYLES.subheadline,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    marginBottom: 8,
  },
  text: {
    ...FONTS_PRESETS.bodyRegular,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    fontStyle: 'normal',
    textDecorationLine: 'none',
    padding: 0,
    margin: 0,
  },

  link: {
    ...FONTS_PRESETS.bodyRegular,
    color: {
      light: COLORS.light.text.link,
      dark: COLORS.dark.text.link,
    },
  },

  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 25,
  },

  bottomBar: {
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
    flexDirection: 'row',
  },
});

export const gradientColorsLight: LinearGradientProps['colors'] = [
  COLORS.light.linearGradient,
  hexWithAlpha(COLORS.light.linearGradient, 0.4),
  hexWithAlpha(COLORS.light.linearGradient, 0),
];
export const gradientColorsDark: LinearGradientProps['colors'] = [
  COLORS.dark.linearGradient,
  hexWithAlpha(COLORS.dark.linearGradient, 0.4),
  hexWithAlpha(COLORS.dark.linearGradient, 0),
];

export const gradientConfig = {
  start: {x: 0.0, y: 0.8},
  end: {x: 0.0, y: 0},
};
