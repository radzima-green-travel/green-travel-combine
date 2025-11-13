import { COLORS, FONTS_STYLES } from 'assets';
import { hexWithAlpha } from 'core/helpers';

export const themeStyles = {
  text: {
    color: {
      light: hexWithAlpha(COLORS.tuna, 0.6),
      dark: COLORS.white,
    },
    paddingLeft: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
    ...FONTS_STYLES.regular12,
  },
};
