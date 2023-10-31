import {COLORS, FONTS_STYLES} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  title: {
    ...FONTS_STYLES.subheadline,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    marginBottom: 16,
  },
  container: {
    paddingHorizontal: PADDING_HORIZONTAL,
    marginTop: 16,
  },
});
