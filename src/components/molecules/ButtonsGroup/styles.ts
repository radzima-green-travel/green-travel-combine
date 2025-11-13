import { createThemeStyles } from 'core/helpers/styles';

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
});
