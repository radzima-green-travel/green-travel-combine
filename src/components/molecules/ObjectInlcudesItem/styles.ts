import {COLORS, FONTS_PRESETS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    marginRight: 12,
    width: 120,
  },

  image: {
    height: 120,
    width: 120,
    borderRadius: 20,
  },

  text: {
    ...FONTS_PRESETS.calloutRegular,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    marginTop: 8,
  },
});
