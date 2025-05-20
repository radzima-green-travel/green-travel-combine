import {StyleSheet} from 'react-native';
import {COLORS, FONTS_PRESETS} from 'assets';

export const styles = StyleSheet.create({
  container: {
    minHeight: 120,
    borderRadius: 20,
    padding: 16,
    gap: 16,
    backgroundColor: COLORS.light.background.success,
  },
  title: {
    ...FONTS_PRESETS.calloutBold,
    color: COLORS.white,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: COLORS.light.other.constantWhite,
    borderWidth: 0,
  },
});
