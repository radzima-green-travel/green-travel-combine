import {COLORS, FONTS_PRESETS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    height: 112,
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
    borderRadius: 20,
  },

  image: {
    height: 80,
    width: 80,
    borderRadius: 20,
  },

  textContainer: {
    marginLeft: 12,
    height: 80,
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    ...FONTS_PRESETS.bodyBold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
  subtitle: {
    ...FONTS_PRESETS.footnoteRegular,
    color: {
      light: COLORS.light.text.secondary,
      dark: COLORS.dark.text.secondary,
    },
    marginTop: 2,
  },
});
