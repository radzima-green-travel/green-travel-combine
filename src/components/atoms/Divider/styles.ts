import { StyleSheet } from 'react-native';
import { COLORS, FONTS_STYLES } from 'assets';

export const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...FONTS_STYLES.regular15,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  lineAround: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.silver,
  },
});
