import {COLORS, FONTS_STYLES} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    paddingTop: 16,
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
    paddingHorizontal: PADDING_HORIZONTAL,
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
});
