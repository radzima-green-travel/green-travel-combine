import {COLORS, FONTS_STYLES} from 'assets';
import {createThemeStyles} from 'core/helpers/styles';

export const themeStyles = createThemeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: {
      light: 'rgba(0, 0, 0, 0.5)',
      dark: 'rgba(0, 0, 0, 0.5)',
    },
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
    color: {
      light: COLORS.light.text.constant,
      dark: COLORS.light.text.constant,
    },
  },
  text: {
    ...FONTS_STYLES.text_12_16_400,
    color: {
      light: COLORS.light.text.constant,
      dark: COLORS.light.text.constant,
    },
  },
});
