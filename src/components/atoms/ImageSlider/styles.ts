import {StyleSheet} from 'react-native';

export const themeStyles = {
  container: {
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    overflow: 'hidden',
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
