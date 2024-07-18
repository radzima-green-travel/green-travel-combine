import {createThemeStyles} from 'core/helpers/styles';
import {COLORS, FONTS_PRESETS} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';

export const themeStyles = createThemeStyles({
  text: {
    ...FONTS_PRESETS.bodyRegular,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingBottom: PADDING_HORIZONTAL,
  },
});
