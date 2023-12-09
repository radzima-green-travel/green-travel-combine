import {COLORS, FONTS_PRESETS} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';

export const themeStyles = {
  container: {
    paddingTop: 32,
    alignItems: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
    flex: 1,
  },
  title: {
    ...FONTS_PRESETS.headlineBold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.light.text.primary,
    },
  },
  titleSingle: {
    ...FONTS_PRESETS.title3Bold,
  },
  text: {
    ...FONTS_PRESETS.footnoteRegular,
    textAlign: 'center',
    marginTop: 8,
    color: {
      light: COLORS.light.text.secondary,
      dark: COLORS.dark.text.secondary,
    },
  },
  secondaryButton: {
    marginTop: 16,
  },

  invisible: {
    opacity: 0,
  },
  formFieldsContainer: {
    marginTop: 24,
    marginBottom: 16,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
};
