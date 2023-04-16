import {COLORS, FONTS_STYLES} from 'assets';

export const themeStyles = {
  container: {
    alignItems: 'flex-start',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    ...FONTS_STYLES.regular14,
    color: {light: COLORS.boulder, dark: COLORS.altoForDark},
  },
  icon: {
    color: {light: COLORS.boulder, dark: COLORS.altoForDark},
  },
  successIcon: {
    color: {
      light: COLORS.apple,
      dark: COLORS.oceanGreen,
    },
  },
};
