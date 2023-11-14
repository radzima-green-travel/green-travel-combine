import {COLORS, FONTS_STYLES} from 'assets';

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
    justifyContent: 'space-between',
    height: 48,
    marginVertical: 13,
    marginHorizontal: 20,
    paddingLeft: 16,
    borderRadius: 8,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  successContainer: {
    backgroundColor: {
      light: COLORS.light.background.success,
      dark: COLORS.dark.background.success,
    },
  },
  errorContainer: {
    backgroundColor: {
      light: COLORS.light.background.negative,
      dark: COLORS.dark.background.negative,
    },
  },
  neutralContainer: {
    backgroundColor: {
      light: COLORS.light.background.secondaryContrast,
      dark: COLORS.dark.background.secondaryContrast,
    },
  },
  text: {
    ...FONTS_STYLES.regular14,
    color: {
      light: COLORS.white,
      dark: COLORS.white,
    },
  },
  neutralText: {
    color: {
      light: COLORS.light.text.tertiary,
      dark: COLORS.dark.text.tertiary,
    },
  },
  icon: {
    backgroundColor: 'transparent',
  },
  closeIcon: {
    color: {
      light: COLORS.light.icon.tertiary,
      dark: COLORS.dark.icon.tertiary,
    },
  },
};
