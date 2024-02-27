import {COLORS, FONTS_STYLES} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
import {createThemeStyles} from 'core/helpers/styles';

export const MARGIN_TOP = 8;

export const themeStyles = createThemeStyles({
  container: {
    flex: 1,
    padding: PADDING_HORIZONTAL,
  },
  header: {
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  title: {
    ...FONTS_STYLES.title3Bold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    marginVertical: 8,
  },
  objectName: {
    color: {
      light: COLORS.light.text.accent,
      dark: COLORS.dark.text.accent,
    },
  },
  list: {
    paddingTop: 8,
    gap: 8,
  },
  buttonContainer: {
    paddingHorizontal: 0,
  },
});
