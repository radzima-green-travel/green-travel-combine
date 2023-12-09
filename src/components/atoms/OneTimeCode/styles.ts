import {COLORS, FONTS_PRESETS} from 'assets';

export const themeStyles = {
  container: {
    flexDirection: 'row',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  digitContainer: {
    width: 36,
    height: 48,
    justifyContent: 'center',
    marginHorizontal: 4,
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
    borderColor: {
      light: COLORS.light.stroke.border,
      dark: COLORS.dark.stroke.border,
    },
    borderWidth: 1,
    borderRadius: 12,
  },
  digitContainerFocused: {
    borderColor: {
      light: COLORS.light.background.success,
      dark: COLORS.dark.background.success,
    },
  },
  digit: {
    ...FONTS_PRESETS.title3Regular,
    textAlign: 'center',
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
  placeholderContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 7,
  },
  placeholder: {
    ...FONTS_PRESETS.title3Regular,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
  },
  hiddenCodeInput: {
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
  },
};
