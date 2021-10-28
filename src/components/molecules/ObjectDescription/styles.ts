import {COLORS, FONTS_STYLES, FONTS} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
export const systemFonts = Object.values(FONTS);

export const themeStyles = {
  container: {
    marginTop: 32,
    marginHorizontal: PADDING_HORIZONTAL,
  },
  headline: {
    ...FONTS_STYLES.semibold20,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
    marginBottom: 12,
  },
  text: {
    ...FONTS_STYLES.regular15,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
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
  ul: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
};
