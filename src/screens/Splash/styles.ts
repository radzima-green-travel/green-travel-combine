import {COLORS} from 'assets';
import {StyleSheet} from 'react-native';

export const themeStyles = {
  container: {
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.secondary,
    },
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
    fontWeight: '600',
  },
};
