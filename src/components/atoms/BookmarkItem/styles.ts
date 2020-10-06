import {StyleSheet} from 'react-native';
import {FONTS, COLORS} from 'assets';

export const styles = StyleSheet.create({
  box: {
    shadowColor: 'rgb(21, 39, 2)',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  text: {
    textTransform: 'uppercase',
    fontFamily: FONTS.primary,
    fontWeight: '400',
    textAlign: 'center',
  },
  count: {
    position: 'absolute',
    top: 12,
    right: 12,
    fontFamily: FONTS.primary,
    fontSize: 10,
    opacity: 0.3,
    color: COLORS.logCabin,
  },
});
