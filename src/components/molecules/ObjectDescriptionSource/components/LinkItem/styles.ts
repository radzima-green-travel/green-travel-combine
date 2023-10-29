import {COLORS, FONTS_STYLES} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  link: {
    ...FONTS_STYLES.text_14_24_400,
    color: {
      light: COLORS.light.text.link,
      dark: COLORS.dark.text.link,
    },
    paddingVertical: 8,
  },
});
