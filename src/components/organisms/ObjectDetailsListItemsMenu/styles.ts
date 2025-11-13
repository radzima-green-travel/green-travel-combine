import { COLORS } from 'assets/colors';
import { PADDING_HORIZONTAL } from 'core/constants';
import { createThemeStyles } from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    paddingHorizontal: PADDING_HORIZONTAL,
    marginVertical: 12,
  },
  listItemContainer: {
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
  },
});
