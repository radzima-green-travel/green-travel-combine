import {COLORS, FONTS_STYLES} from 'assets';

export const themeStyles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -26,
  },
  text: {
    ...FONTS_STYLES.regular15,
    color: {
      light: COLORS.boulder,
      dark: COLORS.altoForDark,
    },
  },
  icon: {
    color: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
  },
};
