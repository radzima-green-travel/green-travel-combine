import {COLORS, FONTS_STYLES} from 'assets';
import {StyleSheet} from 'react-native';

export const themeStyles = {
  listContainer: {
    flex: 1,
    backgroundColor: {
      light: COLORS.white,
      dark: COLORS.background,
    },
  },
  contentContainer: {
    paddingTop: 32,
    paddingLeft: 16,
  },
  emptyListContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListContent: {
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
