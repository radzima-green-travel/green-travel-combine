import {COLORS, FONTS_STYLES} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
import {createThemeStyles} from 'core/helpers/styles';

export const headerGap = 8;

export const themeStyles = createThemeStyles({
  container: {
    flex: 1,
    padding: PADDING_HORIZONTAL,
  },
  header: {
    marginBottom: headerGap,
    gap: headerGap,
    alignItems: 'flex-start',
  },
  title: {
    ...FONTS_STYLES.title3Bold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
  fieldDescription: {
    ...FONTS_STYLES.text_16_24_400,
    color: {
      light: COLORS.light.text.secondary,
      dark: COLORS.dark.text.secondary,
    },
  },
  list: {
    paddingTop: 8,
    gap: 8,
  },
  fieldContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
    gap: 20,
    paddingBottom: 16,
  },
});
