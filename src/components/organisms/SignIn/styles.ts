import {StyleSheet} from 'react-native';
import {COLORS, FONTS_STYLES} from 'assets';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 'auto',
  },
  title: {
    ...FONTS_STYLES.semibold20,
    textAlign: 'center',
    marginBottom: 20,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  text: {
    ...FONTS_STYLES.regular15,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  passwordText: {
    ...FONTS_STYLES.regular16,
    color: COLORS.forestGreen,
    textAlign: 'center',
    marginTop: 25,
  },
  lineAround: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.silver,
  },
});
