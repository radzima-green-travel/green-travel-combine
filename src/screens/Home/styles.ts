import {COLORS, FONTS_PRESETS} from 'assets';

export const themeStyles = {
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: {
      light: COLORS.light.background.secondary,
      dark: COLORS.dark.background.secondary,
    },
  },
  list: {
    flex: 1,
  },
  icon: {
    color: {
      light: COLORS.white,
      dark: COLORS.altoForDark,
    },
  },
  headerTitle: {
    ...FONTS_PRESETS.title3Bold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    marginTop: 24,
    marginBottom: 16,
  },
  searchContainer: {},
  widgetGrid: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexDirection: 'row',
    gap: 24,
  },
  widgetGridRightColumn: {flex: 1, gap: 16},
  widgetGridLeftColumn: {flex: 1.07},
};
