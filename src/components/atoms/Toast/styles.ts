import {COLORS} from 'assets/colors';
import {FONTS_STYLES} from 'assets/fonts';

export const TOAST_HEIGHT = 56;

export const themeStyles = {
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: TOAST_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: {
      light: COLORS.white,
      dark: COLORS.logCabin,
    },
    paddingHorizontal: 20,
  },
  text: {
    ...FONTS_STYLES.regular15,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.white,
    },
  },
};
