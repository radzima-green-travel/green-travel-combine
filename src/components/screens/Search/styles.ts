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
    color: COLORS.boulder,
    textAlign: 'center',
    marginTop: 8,
  },
  listTitle: {
    ...FONTS_STYLES.regular15,
    color: COLORS.logCabin,
    marginBottom: 24,
  },
};
