import { COLORS } from 'assets';

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
  listContent: {
    gap: 24,
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
    flexDirection: 'row',
    paddingTop: 24,
    gap: 24,
  },
  widgetGridRightColumn: { flex: 1, gap: 16 },
  widgetGridLeftColumn: { flex: 1.07 },
  addNewPlaceWidget: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
};
