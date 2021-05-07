import {COLORS, FONTS_STYLES} from 'assets';

export const themeStyles = {
  box: {
    shadowColor: {
      light: 'rgb(21, 39, 2)',
      dark: 'rgb(32, 34, 31)',
    },
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: {
      light: 0.2,
      dark: 0.08,
    },
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: {
      light: COLORS.white,
      dark: COLORS.mirage,
    },
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  text: {
    ...FONTS_STYLES.semibold12,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
  },
  count: {
    position: 'absolute',
    top: 10,
    right: 9,
    ...FONTS_STYLES.semibold12,
    opacity: {
      light: 0.3,
      dark: 1,
    },
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
  },
};
