import { PADDING_HORIZONTAL } from 'core/constants';
import { createThemeStyles } from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  fieldContainer: {
    paddingVertical: 8,
  },
  buttonsContainer: {
    paddingHorizontal: 0,
  },
});
