import {StyleSheet} from 'react-native';
import {COLORS, FONTS_STYLES} from 'assets';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginTop: '20%',
  },
  boxContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    ...FONTS_STYLES.semibold20,
    marginBottom: 20,
  },
  text: {
    ...FONTS_STYLES.regular15,
    textAlign: 'center',
    marginBottom: 20,
  },
  repeatText: {
    ...FONTS_STYLES.regular16,
    color: COLORS.apple,
    textAlign: 'center',
    marginTop: 25,
  },
  notActivated: {
    backgroundColor: COLORS.alto,
  },
});
