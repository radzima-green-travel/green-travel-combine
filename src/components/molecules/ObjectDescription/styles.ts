import {COLORS, FONTS_STYLES} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';

export const themeStyles = {
  container: {
    marginTop: 32,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  headline: {
    ...FONTS_STYLES.semibold20,
    color: {
      light: COLORS.logCabin,
      darl: COLORS.white,
    },
    marginBottom: 12,
  },
  text: {
    ...FONTS_STYLES.regular15,
    color: {
      light: COLORS.logCabin,
      darl: COLORS.white,
    },
  },
};
