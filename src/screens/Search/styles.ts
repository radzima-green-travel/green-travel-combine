import {COLORS} from 'assets';
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
});
