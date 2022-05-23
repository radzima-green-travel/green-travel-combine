import {StyleSheet} from 'react-native';
import {FONTS_STYLES} from 'assets';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginTop: '20%',
  },
  boxContainer: {
    alignItems: 'center',
    marginBottom: 12,
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
});
