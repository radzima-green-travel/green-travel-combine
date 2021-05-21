import {COLORS} from 'assets';
import {hexWithAlpha} from 'core/helpers';
import {StyleSheet} from 'react-native';

export const TOP = 15;
export const LEFT_RATIO = 16 / 375;

export const themeStyles = {
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
  iconWrapper: {
    ...StyleSheet.absoluteFillObject,
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
