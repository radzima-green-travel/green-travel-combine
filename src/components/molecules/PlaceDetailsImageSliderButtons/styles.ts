import {COLORS} from 'assets';
import {hexWithAlpha} from 'core/helpers';

export const TOP_RATIO = 15 / 310;
export const RIGHT_RATIO = 16 / 375;

export const themeStyles = {
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 38,
    backgroundColor: {
      light: COLORS.white,
      dark: COLORS.mirage,
    },
    borderWidth: 1,
    borderColor: {
      light: COLORS.alto,
      dark: hexWithAlpha(COLORS.altoForDark, 0.2),
    },
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
  },
};
