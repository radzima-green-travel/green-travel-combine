import {StyleSheet} from 'react-native';
import {COLORS} from 'assets/colors';

export const styles = StyleSheet.create({
  cardContainer: {
    height: 144,
    shadowColor: 'rgb(21, 39, 2)',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 6,
    borderRadius: 15,
    backgroundColor: COLORS.silver,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
  },
  cardContentContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  title: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.2,
    color: 'white',
    fontWeight: 'bold',
  },
});
