import { FONTS_STYLES, COLORS } from 'assets';
import { PADDING_HORIZONTAL } from 'core/constants';
import { createThemeStyles } from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    paddingHorizontal: PADDING_HORIZONTAL,
    gap: 20,
    paddingBottom: 16,
  },
  description: {
    ...FONTS_STYLES.text_16_24_400,
    color: {
      light: COLORS.light.text.secondary,
      dark: COLORS.dark.text.secondary,
    },
  },
});
