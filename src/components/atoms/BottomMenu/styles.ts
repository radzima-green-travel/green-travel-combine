import {COLORS, FONTS_PRESETS} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  touchIndicator: {
    width: 44,
    height: 4,
    borderRadius: 4,
    backgroundColor: {
      light: COLORS.light.stroke.border,
      dark: COLORS.dark.stroke.border,
    },
  },

  bgStyle: {
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
  },
  closeIcon: {
    color: {
      light: COLORS.logCabin,
      dark: COLORS.altoForDark,
    },
  },
  handleStyles: {
    backgroundColor: {
      light: COLORS.light.background.transparent,
      dark: COLORS.dark.background.transparent,
    },
    padding: 0,
    paddingTop: 8,
  },

  headerButtonsContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 12,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTextContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 12,
  },
  headerTitle: {
    ...FONTS_PRESETS.title3Bold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
  headerSubtitle: {
    ...FONTS_PRESETS.subheadlineRegular,
    marginTop: 8,
    color: {
      light: COLORS.light.text.secondary,
      dark: COLORS.dark.text.secondary,
    },
  },
});
