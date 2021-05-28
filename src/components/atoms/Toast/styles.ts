import {COLORS} from 'assets/colors';
import {FONTS_STYLES} from 'assets/fonts';
import {hexWithAlpha} from 'core/helpers';

export const TOAST_HEIGHT = 56;

export const themeStyles = {
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: {
      light: hexWithAlpha(COLORS.alto, 0.9),
      dark: hexWithAlpha(COLORS.logCabin, 0.9),
    },
    paddingHorizontal: 20,
  },
  topContainer: {
    bottom: undefined,
    top: 0,
  },
  text: {
    ...FONTS_STYLES.regular15,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.white,
    },
  },
};
