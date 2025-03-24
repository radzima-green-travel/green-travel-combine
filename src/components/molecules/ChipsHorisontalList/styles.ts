import {PADDING_HORIZONTAL} from 'core/constants';
import {COLORS, FONTS_PRESETS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    marginVertical: 10,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  title: {
    ...FONTS_PRESETS.headlineBold,
    paddingBottom: 12,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
  listContainer: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipWrapper: {
    flexShrink: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  lastChipWrapper: {
    marginRight: 0,
  },
  itemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemTextStyle: {
    ...FONTS_PRESETS.caption1Bold,
  },
});
