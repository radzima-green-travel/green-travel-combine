import {COLORS} from 'assets';
import {hexWithAlpha} from 'core/helpers';

export const themeStyles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
    borderRadius: 8,

    borderWidth: 1,
    borderColor: {
      light: COLORS.alto,
      dark: hexWithAlpha(COLORS.altoForDark, 0.2),
    },
    backgroundColor: {
      light: COLORS.white,
      dark: COLORS.oxfordBlue,
    },
  },
};
