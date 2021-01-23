import {StyleSheet} from 'react-native';
import {COLORS} from 'assets/colors';
import {FONTS_STYLES} from 'assets/fonts';

export const styles = StyleSheet.create({
  cardContainer: {
    height: 144,
    shadowColor: 'rgb(21, 39, 2)',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 4,
    backgroundColor: '#FAFAFA',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 4,
  },
  cardContentContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  title: {
    flex: 1,
    ...FONTS_STYLES.bold15,
    color: COLORS.white,
  },
  emptyCardTitle: {
    flex: 1,
    ...FONTS_STYLES.bold15,
    color: COLORS.logCabin,
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(32, 36, 30, 0.35)',
    borderRadius: 4,
  },
});
