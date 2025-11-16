import {createThemeStyles} from 'core/helpers/styles';
import {PADDING_HORIZONTAL} from 'core/constants';
import {COLORS} from 'assets/colors';
import {FONTS_PRESETS} from 'assets/fonts';

export const themeStyles = createThemeStyles({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  contentContainer: {
    position: 'absolute',
    height: 1,
    marginTop: -1,
    justifyContent: 'flex-end',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 181,
    height: 124,
  },
  title: {
    ...FONTS_PRESETS.title3Bold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    marginTop: 16,
  },
  description: {
    ...FONTS_PRESETS.subheadlineRegular,
    color: {
      light: COLORS.light.text.secondary,
      dark: COLORS.dark.text.secondary,
    },
    marginTop: 8,
  },
});
