import {COLORS, FONTS} from 'assets';
import {StyleSheet} from 'react-native';

export const themeStyles = {
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
    fontSize: 36,
    fontFamily: FONTS.secondarySemibold,
  },
};
