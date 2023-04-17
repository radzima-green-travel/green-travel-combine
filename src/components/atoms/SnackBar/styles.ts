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
    alignItems: 'center',
    height: 50,
    marginVertical: 13,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderRadius: 4,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  positiveContainer: {
    backgroundColor: {
      light: hexWithAlpha(COLORS.tuna, 0.9),
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
      // should be changed after dark theme design update
      light: COLORS.white,
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
