import {COLORS, FONTS_STYLES} from 'assets';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -26,
  },
  text: {
    ...FONTS_STYLES.regular15,
    color: COLORS.boulder,
  },
});
