import { COLORS, FONTS_STYLES } from 'assets';
import { PADDING_HORIZONTAL } from 'core/constants';

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
    minHeight: 48,
    marginVertical: 13,
    marginHorizontal: PADDING_HORIZONTAL,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderRadius: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  containerWithLeadIcon: {
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 12, // TODO: Should be consistent across variants, raise the design issue
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
  closeButton: {
    backgroundColor: 'transparent',
    marginLeft: 'auto',
  },
  closeIcon: {
    color: {
      light: COLORS.light.icon.tertiary,
      dark: COLORS.dark.icon.tertiary,
    },
  },
  defaultLeadIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  defaultLeadIcon: {
    color: COLORS.white,
  },
  notificationLeadIconContainer: {
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
