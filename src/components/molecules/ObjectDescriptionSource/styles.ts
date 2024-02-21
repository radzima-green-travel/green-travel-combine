import {COLORS, FONTS_STYLES} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';

export const themeStyles = {
  container: {
    marginHorizontal: PADDING_HORIZONTAL,
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
