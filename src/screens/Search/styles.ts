import {COLORS, FONTS_PRESETS} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
import {createThemeStyles} from 'core/helpers/styles';
import {SCREEN_WIDTH} from 'services/PlatformService';

export const themeStyles = createThemeStyles({
  headerTitleContainer: {
    width:
      SCREEN_WIDTH - PADDING_HORIZONTAL * 3 - PADDING_HORIZONTAL / 2 - 48 - 32, // TODO: add constants for 48 and 32 ( right and left button widths )
    marginLeft: PADDING_HORIZONTAL,
  },
  icon: {
    color: {
      light: COLORS.white,
      dark: COLORS.altoForDark,
    },
  },
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
});
