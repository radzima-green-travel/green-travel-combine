import {FONTS_PRESETS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const styles = createThemeStyles({
  container: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderRadius: 12,
    justifyContent: 'space-between',
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  item: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    flex: 1,
  },
  text: {
    ...FONTS_PRESETS.footnoteBold, 
  },
});
