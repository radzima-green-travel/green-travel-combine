import {COLORS, FONTS_PRESETS} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 8,
    marginBottom: 100,
  },
  rateContainer: {
    height: 60,
    justifyContent: 'center',
  },
  rateTitle: {
    ...FONTS_PRESETS.bodyBold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    marginBottom: 8,
  },
  timeSpentTitle: {
    ...FONTS_PRESETS.bodyBold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    marginBottom: 8,
    marginTop: 24,
  },
  timeSpentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  timeText: {
    ...FONTS_PRESETS.headlineBold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    textAlign: 'center',
  },
  time: {
    width: 30,
  },
});
