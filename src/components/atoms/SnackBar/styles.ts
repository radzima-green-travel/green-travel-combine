import { COLORS, FONTS_STYLES } from 'assets';

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
    zIndex: 1,
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  containerWithLeadIcon: {
    justifyContent: 'flex-start',
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
  notificationContainer: {
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
    height: 56,
    marginHorizontal: 16,
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
  notificationText: {
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
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
  defaultLeadIconContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginRight: 12,
  },
  defaultLeadIcon: {
    color: COLORS.white,
  },
  notificationLeadIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: {
      light: COLORS.light.background.quarterly,
      dark: COLORS.dark.background.quarterly,
    },
  },
  notificationLeadIcon: {
    color: {
      light: COLORS.light.icon.accent,
      dark: COLORS.dark.icon.accent,
    },
  },
};
