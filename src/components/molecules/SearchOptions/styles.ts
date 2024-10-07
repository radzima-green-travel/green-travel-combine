import {COLORS, FONTS_STYLES, FONTS_PRESETS} from 'assets';
import {MAP_BOTTOM_MENU_HEIGHT} from 'core/constants';

export const themeStyles = {
  container: {
    minHeight: MAP_BOTTOM_MENU_HEIGHT,
    paddingTop: 16,
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
    paddingHorizontal: 16,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  text: {
    ...FONTS_STYLES.semibold20,
    color: {light: COLORS.logCabin, dark: COLORS.altoForDark},
    flexShrink: 1,
  },
  searchOption: {
    ...FONTS_PRESETS.subheadlineBold,
    paddingVertical: 8,
  },
};
