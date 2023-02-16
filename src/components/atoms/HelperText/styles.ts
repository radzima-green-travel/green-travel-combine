import {COLORS, FONTS_STYLES} from 'assets';

export const themeStyles = {
  messageText: {
    ...FONTS_STYLES.regular14,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
  },
  messageErrorText: {
    color: COLORS.persimmon,
  },
};
