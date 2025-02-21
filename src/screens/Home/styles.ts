import {COLORS} from 'assets';

export const themeStyles = {
  container: {
    flex: 1,
    overflow: 'hidden',
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
  searchContainer: {},
  widgetGrid: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    gap: 24,
    backgroundColor: {
      light: COLORS.light.background.secondary,
      dark: COLORS.dark.background.secondary,
    },
  },
  widgetGridRightColumn: {flex: 1, gap: 16},
  widgetGridLeftColumn: {flex: 1.07},
};
