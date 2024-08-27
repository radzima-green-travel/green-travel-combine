import {COLORS, FONTS_PRESETS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  boldText: {
    ...FONTS_PRESETS.bodyBold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
  regularText: {
    ...FONTS_PRESETS.bodyRegular,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
});
