import {COLORS, FONTS_PRESETS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const ITEM_HEIGHT = 40;

export const themeStyles = createThemeStyles({
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
});
