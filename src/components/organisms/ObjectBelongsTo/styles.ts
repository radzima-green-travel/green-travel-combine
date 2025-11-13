import { COLORS, FONTS_PRESETS } from 'assets';
import { PADDING_HORIZONTAL } from 'core/constants';
import { createThemeStyles } from 'core/helpers/styles';
import { SCREEN_WIDTH } from 'services/PlatformService';

export const themeStyles = createThemeStyles({
  container: { marginTop: 24 },
  listContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  listItem: {
    width: SCREEN_WIDTH * 0.7,
    marginRight: 12,
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
