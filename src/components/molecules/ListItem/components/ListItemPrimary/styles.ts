import { COLORS, FONTS_PRESETS } from 'assets';
import { createThemeStyles } from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    ...FONTS_PRESETS.bodyRegular,
    color: {
      light: COLORS.light.text.secondary,
      dark: COLORS.dark.text.secondary,
    },
  },
  tailIcon: {
    marginLeft: 4,
    color: {
      light: COLORS.light.icon.tertiary,
      dark: COLORS.dark.icon.tertiary,
    },
  },
  leadIconContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginRight: 12,
  },
  leadIcon: {
    color: {
      light: COLORS.light.icon.secondary,
      dark: COLORS.dark.icon.secondary,
    },
  },
});
