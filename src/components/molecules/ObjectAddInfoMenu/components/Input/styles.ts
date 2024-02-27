import {COLORS, FONTS_STYLES} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  prompt: {
    ...FONTS_STYLES.text_16_24_400,
    color: {
      light: COLORS.light.text.secondary,
      dark: COLORS.dark.text.secondary,
    },
    marginBottom: 12,
  },
  fieldContainer: {
    paddingVertical: 8,
  },
});
