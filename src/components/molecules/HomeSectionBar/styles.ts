import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: -16,
    marginTop: 16,
  },
  contentContainer: {
    marginLeft: 10,
    paddingRight: 16,
    paddingBottom: 24,
  },
  crossButton: {
    position: 'absolute',
    left: 15,
    top: 44,
  },
  markerMapButton: {
    position: 'absolute',
    right: 30,
    top: 44,
  },
  cardContainer: {
    width: 324,
  },

  sectionTitle: {
    flex: 1,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 0.2,
    color: 'black',
    textTransform: 'uppercase',
    fontFamily: 'Montserrat-Bold',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
  },
  all: {
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.3,
    color: '#50A021',
  },
});
