import {COLORS, FONTS_STYLES, FONTS} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
export const systemFonts = Object.values(FONTS);

export const themeStyles = {
  container: {
    marginTop: 32,
    marginHorizontal: PADDING_HORIZONTAL,
  },
  text: {
    ...FONTS_STYLES.regular15,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
    fontStyle: 'normal',
    textDecorationLine: 'none',
    padding: 0,
    margin: 0,
  },

  link: {
    ...FONTS_STYLES.regular15,
    color: {
      light: COLORS.cornflowerBlue,
      dark: COLORS.cornflowerBlue,
    },
    textDecorationLine: 'underline',
  },
};
