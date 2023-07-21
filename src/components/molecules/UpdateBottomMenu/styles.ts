import {FONTS_STYLES} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';

export const themeStyles = {
  container: {
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  subTitle: {
    ...FONTS_STYLES.regular13,
  },
  button: {
    marginTop: 8,
  },
  buttonText: {
    textTransform: 'uppercase',
  },
};
