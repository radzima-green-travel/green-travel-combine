import {COLORS, FONTS_PRESETS} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    flex: 1,
    overflow: 'hidden',
    marginHorizontal: PADDING_HORIZONTAL,
  },
  title: {
    ...FONTS_PRESETS.title3Bold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    paddingTop: 4,
    paddingBottom: 8,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    left: -4,
  },
  chipContainer: {
    margin: 4,
  },
  subFilterName: {
    ...FONTS_PRESETS.subheadlineBold,
    paddingVertical: 8,
  },
  icon: {
    color: {
      light: COLORS.light.icon.primary,
      dark: COLORS.dark.icon.primary,
    },
  },
  hideVisitContainer: {
    paddingVertical: 0,
  },
  closeButtonContainer: {
    width: 32,
    height: 32,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: {
      light: COLORS.light.background.secondary,
      dark: COLORS.dark.background.secondary,
    },
  },
  chooseButtonContainer: {
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 40,
  },
  chooseButtonLabel: {
    ...FONTS_PRESETS.footnoteBold,
  },
  settlementsContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settlementsLabel: {
    ...FONTS_PRESETS.subheadlineRegular,
    color: {
      light: COLORS.light.text.secondary,
      dark: COLORS.dark.text.secondary,
    },
  },
  settlementsLabelIcon: {
    marginLeft: 12,
  },
  activeSettlementsLabelContainer: {
    width: 24,
    height: 24,
    borderRadius: 50,
    backgroundColor: {
      light: COLORS.light.background.success,
      dark: COLORS.dark.background.success,
    },
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeSettlementsLabel: {
    ...FONTS_PRESETS.footnoteBold,
    color: {
      light: COLORS.light.other.constantWhite,
      dark: COLORS.dark.other.constantWhite,
    },
  },
  buttonsGroupContainer: {
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  button: {
    ...FONTS_PRESETS.footnoteBold,
  },
});
