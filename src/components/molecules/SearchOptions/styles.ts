import {COLORS, FONTS_PRESETS} from 'assets';
import {MAP_BOTTOM_MENU_HEIGHT, PADDING_HORIZONTAL} from 'core/constants';

export const themeStyles = {
  container: {
    minHeight: MAP_BOTTOM_MENU_HEIGHT,
    paddingTop: 16,
    paddingHorizontal: PADDING_HORIZONTAL,
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
    ...FONTS_PRESETS.title3Bold,
    color: {light: COLORS.logCabin, dark: COLORS.altoForDark},
    flexShrink: 1,
  },
  searchOption: {
    ...FONTS_PRESETS.bodyRegular,
    paddingVertical: 8,
  },
};
