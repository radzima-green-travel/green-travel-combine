import {COLORS, FONTS_PRESETS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';
import {StyleSheet} from 'react-native';

export const themeStyles = createThemeStyles({
  listContainer: {
    flex: 1,
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
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
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
  },
  resultsCount: {
    color: {
      light: COLORS.light.text.tertiary,
      dark: COLORS.dark.text.tertiary,
    },
  },
});
