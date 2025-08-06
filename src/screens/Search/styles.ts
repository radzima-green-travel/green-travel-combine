import {COLORS} from 'assets';
import {HEADER_BOTTOM_RADIUS} from 'core/constants';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  listContainer: {
    flex: 1,
    paddingTop: HEADER_BOTTOM_RADIUS,
    backgroundColor: {
      light: COLORS.light.background.secondary,
      dark: COLORS.dark.background.secondary,
    },
  },
  loaderBackdrop: {
    backgroundColor: {
      light: COLORS.light.background.secondary,
      dark: COLORS.dark.background.secondary,
    },
  },
});
