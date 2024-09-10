import {FONTS_PRESETS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  subFilterName: {
    ...FONTS_PRESETS.subheadlineBold,
    paddingVertical: 8,
  },
  distanceStyle: {
    ...FONTS_PRESETS.headlineBold,
    paddingVertical: 8,
    textAlign: 'center',
  },
});
