import {COLORS, FONTS_STYLES} from 'assets';
import {hexWithAlpha} from 'core/helpers';

export const themeStyles = {
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderRadius: 4,
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
    marginLeft: 16,
    borderWidth: 1,
    borderColor: {
      light: COLORS.alto,
      dark: hexWithAlpha(COLORS.altoForDark, 0.2),
    },
  },
  selectedContainer: {
    backgroundColor: {
      light: COLORS.light.background.accent,
      dark: COLORS.dark.background.accent,
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
