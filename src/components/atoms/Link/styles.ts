import {COLORS, FONTS_PRESETS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  link: {
    ...FONTS_PRESETS.bodyRegular,
    color: {
      light: COLORS.light.text.link,
      dark: COLORS.dark.text.link,
    },
  },
});
