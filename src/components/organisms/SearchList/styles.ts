import {COLORS, FONTS_STYLES} from 'assets';

export const themeStyles = {
  contentContainer: {
    paddingTop: 32,
    paddingLeft: 16,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emtyListText: {
    ...FONTS_STYLES.regular15,
    color: {
      light: COLORS.boulder,
      dark: COLORS.altoForDark,
    },
    textAlign: 'center',
    marginTop: 8,
  },
  listTitle: {
    ...FONTS_STYLES.regular15,
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
    marginBottom: 24,
  },
};
