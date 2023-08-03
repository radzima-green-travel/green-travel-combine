import {COLORS, FONTS_STYLES} from 'assets';

export const themeStyles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: {
      light: COLORS.white,
      dark: COLORS.background,
    },
  },
  text: {
    ...FONTS_STYLES.regular14,
    color: {
      light: COLORS.boulder,
      dark: COLORS.altoForDark,
    },
    textAlign: 'center',
    paddingTop: 27,
    paddingBottom: 30,
  },
  icon: {
    color: {
      light: COLORS.balticSea,
      dark: COLORS.mirage,
    },
  },
};
