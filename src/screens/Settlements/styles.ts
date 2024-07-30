import {COLORS, FONTS_PRESETS} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    flex: 1,
    overflow: 'hidden',
    marginHorizontal: PADDING_HORIZONTAL,
  },
  backButtonContainer: {
    width: 32,
    height: 32,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: {
      light: COLORS.light.background.secondary,
      dark: COLORS.dark.background.secondary,
    },
  },
  icon: {
    color: {
      light: COLORS.light.icon.primary,
      dark: COLORS.dark.icon.primary,
    },
  },
  button: {
    ...FONTS_PRESETS.footnoteBold,
  },
});
