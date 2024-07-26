import {createThemeStyles} from 'core/helpers/styles';
import {Platform} from 'react-native';

export const PADDING = 16;

export const themeStyles = createThemeStyles({
  container: {
    padding: PADDING,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginRight: 8,
  },
  lastButton: {
    marginRight: 0,
  },
  nonIconButton: {
    flex: 1,
  },
  buttonShadow: {
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
});
