import {COLORS, FONTS_STYLES} from 'assets';

export const themeStyles = {
  container: {
    paddingTop: 16,
  },
  title: {
    ...FONTS_STYLES.title3Bold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },

  subtitle: {
    ...FONTS_STYLES.subtitle,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    marginTop: 8,
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  location: {
    ...FONTS_STYLES.text_12_20_400,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
  copyLocation: {
    color: {
      light: COLORS.light.text.accent,
      dark: COLORS.dark.text.accent,
    },
  },
  copyIcon: {
    color: {
      light: COLORS.light.text.accent,
      dark: COLORS.dark.text.accent,
    },
    marginLeft: 8,
    marginRight: 2,
  },
};
