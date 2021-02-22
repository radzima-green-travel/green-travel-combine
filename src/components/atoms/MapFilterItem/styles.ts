import {COLORS, FONTS_STYLES} from 'assets';

export const themeStyles = {
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderRadius: 4,
    backgroundColor: COLORS.white,
    marginLeft: 16,
  },
  selectedContainer: {
    backgroundColor: COLORS.apple,
  },

  text: {
    ...FONTS_STYLES.regular13,
    color: COLORS.logCabin,
  },
  selectedText: {
    color: COLORS.white,
  },
  icon: {
    color: COLORS.logCabin,
  },

  selectedIcon: {
    color: COLORS.white,
  },
};
