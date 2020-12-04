import {COLORS, FONTS_STYLES} from 'assets';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  containerSolid: {
    paddingVertical: 15,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  labelSolid: {
    ...FONTS_STYLES.semibold14,
    color: COLORS.white,
    textTransform: 'uppercase',
    textAlign: 'center',
    flex: 1,
  },
  containerOutline: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#61B033',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelOutline: {
    ...FONTS_STYLES.semibold14,
    color: COLORS.primary,
    textTransform: 'uppercase',
  },
});
