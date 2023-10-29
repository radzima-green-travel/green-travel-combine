import {Platform} from 'react-native';

export const themeStyles = {
  container: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    tight: 0,
    flex: 1,
  },
  showOnMapButton: {
    flex: 1,
  },
  button: {
    marginRight: 8,
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: 'rgba(0, 0, 0, 0.15)',
          shadowOffset: {width: 2, height: 9},
          shadowOpacity: 1,
          shadowRadius: 10,
        }
      : {
          elevation: 4,
          shadowColor: 'rgba(0, 0, 0, 0.15)',
        }),
  },
};
