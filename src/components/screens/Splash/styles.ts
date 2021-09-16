import {COLORS, FONTS} from 'assets';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#444444',
    fontSize: 36,
    fontFamily: FONTS.secondarySemibold,
  },
});
