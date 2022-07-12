import {COLORS, FONTS_STYLES} from 'assets';

export const themeStyles = {
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: {
      light: COLORS.white,
      dark: COLORS.background,
    },
  },
  title: {
    ...FONTS_STYLES.semibold20,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 'auto',
  },
  passwordText: {
    ...FONTS_STYLES.regular16,
    color: {
      light: COLORS.forestGreen,
      dark: COLORS.oceanGreen,
    },
    textAlign: 'center',
    marginTop: 25,
  },
  warning: {
    ...FONTS_STYLES.regular13,
    textAlign: 'center',
    paddingBottom: 9,
    marginTop: 'auto',
  },
  link: {
    color: COLORS.cornflowerBlue,
  },
};
