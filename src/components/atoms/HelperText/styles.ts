import { COLORS, FONTS_PRESETS } from 'assets';

export const themeStyles = {
  messageText: {
    ...FONTS_PRESETS.caption1Regular,
    color: {
      light: COLORS.light.text.secondary,
      dark: COLORS.dark.text.secondary,
    },
  },
  messageErrorText: {
    ...FONTS_PRESETS.footnoteRegular,
    color: {
      light: COLORS.light.text.negative,
      dark: COLORS.dark.text.negative,
    },
  },
};
