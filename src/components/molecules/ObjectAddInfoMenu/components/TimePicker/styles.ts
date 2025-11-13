import { COLORS, FONTS_PRESETS } from 'assets';
import { createThemeStyles } from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    paddingTop: 16,
  },
  prompt: {
    ...FONTS_PRESETS.subheadlineBold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    marginBottom: 8,
  },
  timeText: {
    ...FONTS_PRESETS.headlineBold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    textAlign: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  rangePicker: {
    marginBottom: 16,
  },
});
