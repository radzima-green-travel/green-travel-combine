import {COLORS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
    borderRadius: undefined,
  },
  subtitleContainer: {
    flexDirection: 'row',
  },
  subtitleHighlight: {
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
  iconContainer: {
    alignSelf: 'center',
    backgroundColor: {
      dark: COLORS.dark.background.quarterly,
      light: COLORS.light.background.quarterly,
    },
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
  },
  leadIconStyle: {
    color: {
      light: COLORS.light.icon.accent,
      dark: COLORS.dark.icon.accent,
    },
    fontSize: 20,
  },
  tailIconStyle: {
    color: {
      light: COLORS.light.icon.tertiary,
      dark: COLORS.dark.icon.tertiary,
    },
    fontSize: 24,
  },
});
