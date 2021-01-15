import {COLORS, FONTS_STYLES} from 'assets';

export const themeStyles = {
  container: {
    marginBottom: 24,
  },
  title: {
    ...FONTS_STYLES.semibold20,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.silver,
    },
    marginBottom: 4,
  },

  subtitle: {
    ...FONTS_STYLES.regular13,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.silver,
    },
  },

  location: {
    ...FONTS_STYLES.regular13,
    color: {
      light: 'rgb(95,155,216)',
      dark: COLORS.silver,
    },
  },
};
