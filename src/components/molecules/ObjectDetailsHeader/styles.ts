import {StyleSheet} from 'react-native';

export const themeStyles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  andoridHeaderBG: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.97,
  },
  rightButtonsContainer: {
    flexDirection: 'row',
  },
  shareButtonContainer: {
    marginRight: 16,
  },
};
