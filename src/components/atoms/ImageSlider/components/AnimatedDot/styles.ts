import {COLORS} from 'assets';
import {DOT_MARGIN, DOT_SIZE} from '../../constants';

export const themeStyles = {
  container: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    marginRight: DOT_MARGIN,
    backgroundColor: {
      light: COLORS.alto,
      dark: COLORS.fiord,
    },
  },
  active: {
    backgroundColor: {
      light: COLORS.apple,
      dark: COLORS.oceanGreen,
    },
  },
};
