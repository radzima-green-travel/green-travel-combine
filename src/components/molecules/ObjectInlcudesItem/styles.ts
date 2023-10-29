import {COLORS, FONTS_STYLES} from 'assets';

export const themeStyles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  text: {
    ...FONTS_STYLES.text_15_24_400,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    marginLeft: 10,
    marginRight: 'auto',
  },
  icon: {
    color: {
      light: COLORS.light.icon.primary,
      dark: COLORS.dark.icon.primary,
    },
  },
};
