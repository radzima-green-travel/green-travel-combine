import {COLORS, FONTS_STYLES} from 'assets';

export const themeStyles = {
  container: {alignItems: 'center'},
  title: {
    ...FONTS_STYLES.semibold20,
    color: {
      light: COLORS.balticSea,
      dark: COLORS.altoForDark,
    },
    marginBottom: 24,
  },
  appleIcon: {
    color: {
      light: COLORS.white,
      dark: COLORS.black,
    },
  },
  emailIconOtherOption: {
    color: {
      light: COLORS.balticSea,
      dark: COLORS.white,
    },
  },
  otherOptionsButton: {
    marginBottom: 16,
    borderRadius: 14,
    borderColor: {
      light: COLORS.light.text.secondary,
      dark: COLORS.dark.text.secondary,
    },
  },
  otherButtonText: {
    color: {
      light: COLORS.light.background.constant,
      dark: COLORS.dark.background.constant,
    },
  },
  separatorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 32,
  },
  separator: {
    height: 1,
    backgroundColor: {
      light: COLORS.boulder,
      dark: COLORS.silver,
    },
    flex: 1,
  },
  separatorText: {
    marginHorizontal: 8,
    ...FONTS_STYLES.regular14,
    color: {
      light: COLORS.boulder,
      dark: COLORS.silver,
    },
  },
};
