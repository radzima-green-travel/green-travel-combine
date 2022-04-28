import {StyleSheet} from 'react-native';
import {COLORS, FONTS_STYLES} from 'assets';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  warning: {
    ...FONTS_STYLES.regular13,
    textAlign: 'center',
    paddingBottom: 9,
    marginTop: 'auto',
  },
  link: {
    color: COLORS.cornflowerBlue,
    textDecorationLine: 'underline',
  },
});
