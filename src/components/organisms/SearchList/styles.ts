import {COLORS, FONTS_PRESETS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';
import {StyleSheet} from 'react-native';

const itemGap = 12;

export const themeStyles = createThemeStyles({
  listContainer: {
    flex: 1,
  },
  listContentContainer: {
    paddingHorizontal: 16,
    gap: itemGap,
    paddingBottom: 40,
    flexGrow: 1,
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
  emptyListText: {
    ...FONTS_PRESETS.footnoteRegular,
    color: {
      light: COLORS.light.text.secondary,
      dark: COLORS.light.text.secondary,
    },
    textAlign: 'center',
  },
  listHeader: {
    paddingHorizontal: 0,
    marginBottom: -itemGap,
  },
  resultsCount: {
    color: {
      light: COLORS.light.text.tertiary,
      dark: COLORS.dark.text.tertiary,
    },
  },
  columnWrapper: {
    gap: itemGap,
  },
  card: {
    minHeight: 168,
    flex: 0.5,
  },
  get cardLast() {
    return {
      ...this.card,
      marginRight: itemGap / 2,
    };
  },
});
