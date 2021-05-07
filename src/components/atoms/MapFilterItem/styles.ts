import {COLORS, FONTS_STYLES} from 'assets';

export const themeStyles = {
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderRadius: 4,
    backgroundColor: {
      light: COLORS.white,
      dark: COLORS.oxfordBlue,
    },
    marginLeft: 16,
  },
  selectedContainer: {
    backgroundColor: {
      light: COLORS.apple,
      dark: COLORS.oceanGreen,
    },
  },

  text: {
    ...FONTS_STYLES.regular13,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
  },
  selectedText: {
    color: COLORS.white,
  },
  icon: {
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
    marginRight: 7,
  },

  selectedIcon: {
    color: COLORS.white,
  },
};
