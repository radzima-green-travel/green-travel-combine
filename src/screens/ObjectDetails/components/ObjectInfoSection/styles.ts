import {COLORS} from 'assets/colors';
import {PADDING_HORIZONTAL} from 'core/constants';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: 12,
  },
  listItemIcon: {
    color: {
      light: COLORS.light.icon.accentLight,
      dark: COLORS.dark.icon.accentLight,
    },
  },
  listItemContainer: {
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
  },

  dropdownTextStyle: {
    color: {
      light: COLORS.light.text.accent,
      dark: COLORS.dark.text.accent,
    },
  },
});
