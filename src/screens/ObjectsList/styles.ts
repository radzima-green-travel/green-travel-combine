import { COLORS } from 'assets';
import { HEADER_OVERLAY_OFFSET } from 'core/constants';
import { createThemeStyles } from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  listContainer: {
    paddingTop: HEADER_OVERLAY_OFFSET,
    backgroundColor: {
      light: COLORS.light.background.secondary,
      dark: COLORS.dark.background.secondary,
    },
  },
});
