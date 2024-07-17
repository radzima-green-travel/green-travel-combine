import {COLORS, FONTS_PRESETS} from 'assets';

export const themeStyles = {
  sectionContainer: {
    marginBottom: 20,
  },
  subSectionContainer: {
    width: '100%',
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionName: {
    ...FONTS_PRESETS.headlineBold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    paddingVertical: 8,
    marginBottom: 4,
  },
  subSectionName: {
    ...FONTS_PRESETS.subheadlineRegular,
    paddingVertical: 8,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
};
