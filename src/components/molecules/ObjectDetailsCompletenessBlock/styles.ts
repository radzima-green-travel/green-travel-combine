import {COLORS, FONTS_PRESETS} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    backgroundColor: {
      light: COLORS.light.background.success,
      dark: COLORS.dark.background.success,
    },
    borderRadius: 21,
    paddingVertical: PADDING_HORIZONTAL,
    marginHorizontal: PADDING_HORIZONTAL,
    marginBottom: 12,
  },
  containerSmall: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: {
      light: COLORS.light.background.success,
      dark: COLORS.dark.background.success,
    },
    marginHorizontal: PADDING_HORIZONTAL,
    marginBottom: 12,
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    color: {
      light: COLORS.light.text.constant,
      dark: COLORS.dark.text.constant,
    },
    marginRight: 12,
    marginLeft: 8,
  },
  title: {
    ...FONTS_PRESETS.footnoteBold,
    color: {
      light: COLORS.light.text.constant,
      dark: COLORS.dark.text.constant,
    },
    marginHorizontal: PADDING_HORIZONTAL,
  },
  titleSmall: {
    ...FONTS_PRESETS.footnoteRegular,
    color: {
      light: COLORS.light.text.constant,
      dark: COLORS.dark.text.constant,
    },
    marginLeft: PADDING_HORIZONTAL,
    marginRight: 8,
  },
  list: {
    margin: PADDING_HORIZONTAL,
  },
  listItem: {
    ...FONTS_PRESETS.caption1Regular,
    color: {
      light: COLORS.light.text.constant,
      dark: COLORS.dark.text.constant,
    },
    marginVertical: 4,
  },
  listItemText: {
    flex: 1,
  },
  listRow: {
    flexDirection: 'row',
  },
  listRowCell: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: PADDING_HORIZONTAL,
    borderWidth: 0,
    backgroundColor: {
      light: COLORS.light.other.constantWhite,
      dark: COLORS.dark.other.constantWhite,
    },
  },
});
