import {COLORS, FONTS_STYLES} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';

export const themeStyles = {
  title: {
    ...FONTS_STYLES.semibold20,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.silver,
    },
    marginBottom: 24,
    marginTop: 32,
  },
  container: {
    paddingHorizontal: PADDING_HORIZONTAL,
  },
};
