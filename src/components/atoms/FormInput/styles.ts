import {COLORS, FONTS_PRESETS} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';
import {StyleSheet} from 'react-native';

export const themeStyles = createThemeStyles({
  container: {
    alignSelf: 'stretch',
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,

    borderWidth: 1,
    borderRadius: 12,
    borderColor: {
      light: COLORS.light.stroke.border,
      dark: COLORS.dark.stroke.border,
    },
    backgroundColor: {
      light: COLORS.light.background.primary,
      dark: COLORS.dark.background.primary,
    },
    alignSelf: 'stretch',
    paddingHorizontal: 12,
  },

  activeFieldContainer: {
    borderColor: {
      light: COLORS.light.background.success,
      dark: COLORS.dark.background.success,
    },
  },
  errorFieldContainer: {
    borderColor: {
      light: COLORS.light.background.negative,
      dark: COLORS.dark.background.negative,
    },
  },
  dangerBorder: {
    borderColor: COLORS.persimmon,
  },
  inputFieldWrapper: {
    flex: 1,
    marginVertical: 4,
  },
  inputField: {
    ...FONTS_PRESETS.bodyRegular,
    margin: 0,
    padding: 0,
    lineHeight: 20,
    paddingTop: 14,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    flex: 1,
  },
  icon: {
    color: {
      light: COLORS.light.icon.tertiary,
      dark: COLORS.dark.icon.tertiary,
    },
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  labelContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  label: {
    ...FONTS_PRESETS.bodyRegular,
    color: {
      light: COLORS.light.text.secondary,
      dark: COLORS.dark.text.secondary,
    },
  },
  multilineInputWrapper: {
    height: 90,
    paddingHorizontal: 0,
  },
  multilineInputFieldWrapper: {
    marginVertical: 0,
  },
  multilineInputField: {
    paddingTop: 12,
    paddingBottom: 12,
    textAlignVertical: 'top',
    paddingHorizontal: 12,
  },
  placeholderText: {
    color: {
      light: COLORS.light.text.secondary,
      dark: COLORS.dark.text.secondary,
    },
  },
});
