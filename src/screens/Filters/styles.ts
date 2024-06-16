import {COLORS, FONTS_PRESETS} from 'assets';

export const themeStyles = {
  container: {
    flex: 1,
    overflow: 'hidden',
    paddingHorizontal: 16,
  },
  title: {
    ...FONTS_PRESETS.title3Bold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    paddingTop: 4,
    paddingBottom: 8,
  },
  filterContainer: {
    marginBottom: 20,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    left: -4,
  },
  chipContainer: {
    margin: 4,
  },
  filterName: {
    ...FONTS_PRESETS.headlineBold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    paddingVertical: 8,
    marginBottom: 4,
  },
  icon: {
    color: {
      light: COLORS.light.icon.primary,
      dark: COLORS.dark.icon.primary,
    },
  },
  lineItemContainer: {
    width: '100%',
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lineItemName: {
    ...FONTS_PRESETS.subheadlineRegular,
    paddingVertical: 8,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
  hideVisitContainer: {
    paddingVertical: 0,
  },
  closeButtonContainer: {
    width: 32,
    height: 32,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: {
      light: COLORS.light.background.secondary,
      dark: COLORS.dark.background.secondary,
    },
  },
};
