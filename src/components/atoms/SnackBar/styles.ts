import {COLORS, FONTS_STYLES} from 'assets';
import {hexWithAlpha} from 'core/helpers';

export const themeStyles = {
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  topContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  positiveContainer: {
    backgroundColor: {
      light: hexWithAlpha(COLORS.alto, 0.9),
      dark: hexWithAlpha(COLORS.logCabin, 0.9),
    },
  },
  errorContainer: {
    backgroundColor: COLORS.persimmon,
  },
  text: {
    ...FONTS_STYLES.regular15,
  },
  icon: {
    marginLeft: 12,
  },
  positiveText: {
    color: {
      light: COLORS.logCabin,
      dark: COLORS.white,
    },
  },

  errorText: {
    ...FONTS_STYLES.semibold15,
    color: {
      light: COLORS.white,
      dark: COLORS.white,
    },
  },
};
