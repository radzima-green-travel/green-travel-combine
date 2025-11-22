import { COLORS, FONTS_PRESETS } from 'assets';
import { PADDING_HORIZONTAL } from 'core/constants';
import { createThemeStyles } from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: { marginTop: 24 },
  listContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  title: {
    ...FONTS_PRESETS.headlineBold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: 12,
  },
});
