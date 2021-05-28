import {COLORS} from 'assets/colors';
import {FONTS_STYLES} from 'assets/fonts';
import {StyleSheet} from 'react-native';

export const TOAST_HEIGHT = 56;

export const themeStyles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.persimmon,
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    ...FONTS_STYLES.semibold15,
    color: {
      light: COLORS.white,
      dark: COLORS.white,
    },
  },
};
