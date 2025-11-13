import { COLORS, FONTS_PRESETS } from 'assets';

export const themeStyles = {
  container: {
    marginTop: 12,
  },
  title: {
    ...FONTS_PRESETS.footnoteBold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
  link: {
    marginTop: 8,
  },
};
