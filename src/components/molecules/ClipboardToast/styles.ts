import {COLORS} from 'assets/colors';
import {FONTS_STYLES} from 'assets/fonts';

export const TOAST_HEIGHT = 56;

export const themeStyles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...FONTS_STYLES.regular15,
    marginRight: 12,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.white,
    },
  },
};
