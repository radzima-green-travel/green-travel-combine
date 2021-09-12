import {COLORS} from 'assets';
import {StyleSheet} from 'react-native';

export const themeStyles = {
  container: {
    backgroundColor: {
      light: COLORS.alabaster,
      dark: COLORS.mirage,
    },
  },
  image: {
    height: '100%',
  },
  progressContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
