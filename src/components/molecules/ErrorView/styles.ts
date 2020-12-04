import {COLORS, FONTS_STYLES} from 'assets';
import {PADDING_HORIZONTAL} from 'core/constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginHorizontal: PADDING_HORIZONTAL,
    marginTop: 32,
  },
  text: {
    ...FONTS_STYLES.regular15,
    color: '#828282',
  },
});
