import {PADDING_HORIZONTAL} from 'core/constants';
import {COLORS, FONTS_PRESETS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  title: {
    ...FONTS_PRESETS.headlineBold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
  container: {
    marginTop: 24,
    marginHorizontal: PADDING_HORIZONTAL,
  },
  item: {
    marginTop: 12,
  },
});
