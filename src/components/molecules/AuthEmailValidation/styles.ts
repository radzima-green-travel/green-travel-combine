import {StyleSheet} from 'react-native';
import {COLORS, FONTS_STYLES} from 'assets';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: '20%',
  },
  boxContainer: {
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 25,
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
  },
  notActivated: {
    backgroundColor: COLORS.alto,
  },
});
