import { PADDING_HORIZONTAL } from 'core/constants';
import { createThemeStyles } from 'core/helpers/styles';
import { COLORS, FONTS_PRESETS } from 'assets';

export const themeStyles = createThemeStyles({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  image: { width: 124, height: 124, marginTop: 16 },
  title: {
    ...FONTS_PRESETS.title3Bold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    marginTop: 16,
  },
  subtitle: {
    ...FONTS_PRESETS.subheadlineRegular,
    color: {
      light: COLORS.light.text.secondary,
      dark: COLORS.dark.text.secondary,
    },
    marginTop: 8,
    marginBottom: 32,
    textAlign: 'center',
  },
  buttonsContainer: {
    paddingHorizontal: 0,
  },
});
