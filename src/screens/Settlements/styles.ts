import {COLORS, FONTS_PRESETS} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
import {createThemeStyles} from 'core/helpers/styles';

export const ITEM_HEIGHT = 40;

export const themeStyles = createThemeStyles({
  container: {
    flex: 1,
    overflow: 'hidden',
    marginHorizontal: PADDING_HORIZONTAL,
  },
  backButtonContainer: {
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
  icon: {
    color: {
      light: COLORS.light.icon.primary,
      dark: COLORS.dark.icon.primary,
    },
  },
  button: {
    ...FONTS_PRESETS.footnoteBold,
  },
  resetButtonText: {
    ...FONTS_PRESETS.calloutRegular,
    color: {
      light: COLORS.light.text.accent,
      dark: COLORS.dark.text.accent,
    },
  },
  sectionHeaderContainer: {
    height: 24,
    paddingHorizontal: 16,
    backgroundColor: {
      light: COLORS.light.background.secondary,
      dark: COLORS.dark.background.secondary,
    },
    justifyContent: 'center',
    borderRadius: 12,
  },
  sectionHeaderText: {
    ...FONTS_PRESETS.caption1Bold,
    color: {
      light: COLORS.light.text.secondary,
      dark: COLORS.dark.text.secondary,
    },
  },
  sectionHeaderWrapper: {
    paddingVertical: 8,
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
  },
  sectionItemContainer: {
    height: ITEM_HEIGHT,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionItemText: {
    ...FONTS_PRESETS.calloutRegular,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    marginHorizontal: 12,
  },
  listEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listEmptyText: {
    ...FONTS_PRESETS.footnoteRegular,
    color: {
      light: COLORS.light.text.secondary,
      dark: COLORS.dark.text.secondary,
    },
  },
});
