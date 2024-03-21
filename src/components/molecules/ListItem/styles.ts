import {COLORS, FONTS_PRESETS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: {
      light: COLORS.light.background.secondary,
      dark: COLORS.dark.background.secondary,
    },
  },

  topContainer: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  bottomContainer: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 16,
    paddingRight: 32,
  },
  titleContainerSeparator: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: {
      light: COLORS.light.stroke.dividerLight,
      dark: COLORS.dark.stroke.dividerLight,
    },
  },

  titleContainerBottomMiddle: {
    paddingTop: 8,
  },
  title: {
    ...FONTS_PRESETS.bodyBold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },

  titleSecondary: {
    ...FONTS_PRESETS.bodyRegular,
  },
  titleLink: {
    color: {
      light: COLORS.light.text.accent,
      dark: COLORS.dark.text.accent,
    },
  },
  secondaryContentContainer: {
    flexDirection: 'column-reverse',
  },
  subtitleOffset: {
    height: 2,
  },
  subtitle: {
    ...FONTS_PRESETS.caption1Regular,
    color: {
      light: COLORS.light.text.secondary,
      dark: COLORS.dark.text.secondary,
    },
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    ...FONTS_PRESETS.bodyRegular,
    color: {
      light: COLORS.light.text.secondary,
      dark: COLORS.dark.text.secondary,
    },
  },
  tailIcon: {
    marginLeft: 4,
    color: {
      light: COLORS.light.icon.tertiary,
      dark: COLORS.dark.icon.tertiary,
    },
  },
  leadIconContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginRight: 12,
  },
  leadIcon: {
    color: {
      light: COLORS.light.icon.secondary,
      dark: COLORS.dark.icon.secondary,
    },
  },
});
