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
  emailIconFirstOption: {
    color: COLORS.white,
  },
  emailIconOtherOption: {
    color: {
      light: COLORS.balticSea,
      dark: COLORS.white,
    },
  },
  otherOptionsButton: {
    marginBottom: 16,
  },
  separatorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginVertical: 32,
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
    marginHorizontal: 20,
    ...FONTS_STYLES.regular14,
    color: {
      light: COLORS.boulder,
      dark: COLORS.silver,
    },
  },
};
