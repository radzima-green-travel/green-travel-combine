import {COLORS, FONTS_STYLES} from 'assets';

export const themeStyles = {
  container: {
    alignItems: 'flex-start',
    paddingTop: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 7,
  },
  text: {
    ...FONTS_STYLES.regular12,
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
  hintsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
};
