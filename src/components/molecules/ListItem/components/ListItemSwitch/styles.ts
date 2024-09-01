import {COLORS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
  },
  titleContainer: {
    paddingVertical: 8,
  },
});
