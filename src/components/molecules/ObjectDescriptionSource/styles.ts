import {COLORS, FONTS_STYLES} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';

export const themeStyles = {
  container: {
    marginTop: 16,
    marginHorizontal: PADDING_HORIZONTAL,
  },
  title: {
    ...FONTS_STYLES.subheadline,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    marginBottom: 8,
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
