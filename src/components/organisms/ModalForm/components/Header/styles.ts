import { COLORS, FONTS_STYLES } from 'assets';
import { createThemeStyles } from 'core/helpers/styles';

export const containerGap = 8;

export const themeStyles = createThemeStyles({
  container: {
    marginBottom: containerGap,
    gap: containerGap,
    alignItems: 'flex-start',
  },
  title: {
    ...FONTS_STYLES.title3Bold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
});
