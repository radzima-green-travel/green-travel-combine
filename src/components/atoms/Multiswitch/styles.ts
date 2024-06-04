import {FONTS_PRESETS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const styles = createThemeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    borderRadius: 12,
  },
  item: {
    height: 40,
    minWidth: 84,
    paddingHorizontal: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  text: {
    ...FONTS_PRESETS.footnoteBold,
  },
});
