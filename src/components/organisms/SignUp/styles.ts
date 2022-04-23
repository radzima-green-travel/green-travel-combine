import {StyleSheet} from 'react-native';
import {FONTS_STYLES} from 'assets';

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
});
