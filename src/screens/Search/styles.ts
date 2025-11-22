import { COLORS } from 'assets';
import { createThemeStyles } from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  loaderBackdrop: {
    backgroundColor: {
      light: COLORS.light.background.secondary,
      dark: COLORS.dark.background.secondary,
    },
  },
});
