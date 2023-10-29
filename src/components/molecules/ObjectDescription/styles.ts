import {COLORS, FONTS_STYLES, FONTS} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
export const systemFonts = Object.values(FONTS);

export const themeStyles = {
  container: {
    marginHorizontal: PADDING_HORIZONTAL,
  },
  descrioptionHeadline: {
    ...FONTS_STYLES.subheadline,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: 8,
    marginTop: 16,
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
};
