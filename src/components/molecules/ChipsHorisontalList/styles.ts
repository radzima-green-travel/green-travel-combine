import {PADDING_HORIZONTAL} from 'core/constants';
import {COLORS, FONTS_PRESETS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
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
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 8,
  },
  chipWrapper: {
    flexShrink: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: 48,
  },
  itemTextStyle: {
    ...FONTS_PRESETS.caption1Bold,
  },
});
