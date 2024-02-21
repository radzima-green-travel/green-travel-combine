import {COLORS, FONTS_STYLES, FONTS} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
import {createThemeStyles} from 'core/helpers/styles';
export const systemFonts = Object.values(FONTS);

export const themeStyles = createThemeStyles({
  container: {
    marginHorizontal: PADDING_HORIZONTAL,
    padding: PADDING_HORIZONTAL,
    borderRadius: 21,
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
    marginBottom: PADDING_HORIZONTAL,
  },

  headline: {
    ...FONTS_STYLES.subheadline,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    marginBottom: 8,
  },
  text: {
    ...FONTS_STYLES.text_16_24_400,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    fontStyle: 'normal',
    textDecorationLine: 'none',
    padding: 0,
    margin: 0,
  },

  link: {
    ...FONTS_STYLES.text_16_24_400,
    color: {
      light: COLORS.light.text.accent,
      dark: COLORS.dark.text.accent,
    },
  },
});
