import {StyleSheet} from 'react-native';
import {COLORS, FONTS_STYLES} from 'assets';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    ...FONTS_STYLES.semibold20,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 'auto',
  },
  passwordText: {
    ...FONTS_STYLES.regular16,
    color: COLORS.forestGreen,
    textAlign: 'center',
    marginTop: 25,
  },
  warning: {
    ...FONTS_STYLES.regular13,
    textAlign: 'center',
    paddingBottom: 9,
    marginTop: 'auto',
  },
  link: {
    color: COLORS.cornflowerBlue,
  },
});
