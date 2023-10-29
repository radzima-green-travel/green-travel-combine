import {COLORS} from 'assets';
import {hexWithAlpha} from 'core/helpers';
import {StyleSheet} from 'react-native';

export const TOP = 15;
export const LEFT_RATIO = 16 / 375;

export const themeStyles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: {
      light: COLORS.light.background.secondary,
      dark: COLORS.dark.background.secondary,
    },
    borderColor: {
      light: COLORS.alto,
      dark: hexWithAlpha(COLORS.altoForDark, 0.2),
    },
  },
  iconWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
};
