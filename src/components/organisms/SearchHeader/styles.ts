import {COLORS, FONTS_PRESETS} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  headerTitleContainer: {},
  filtersBadge: {
    position: 'absolute',
    right: -4,
    top: -4,
    width: 20,
    height: 20,
    backgroundColor: {
      light: COLORS.light.background.success,
      dark: COLORS.dark.background.success,
    },
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    ...FONTS_PRESETS.caption1Bold,
    color: {
      light: COLORS.light.text.constant,
      dark: COLORS.dark.text.constant,
    },
  },
  filterList: {
    marginHorizontal: -PADDING_HORIZONTAL,
  },
  filterListContent: {
    paddingTop: 20,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  title: {
    ...FONTS_PRESETS.title3Bold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    marginBottom: 16,
  },
  backButton: {
    marginRight: 8,
  },
});
