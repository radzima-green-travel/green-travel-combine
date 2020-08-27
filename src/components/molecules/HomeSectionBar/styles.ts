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
    height: 144,
    shadowColor: 'rgb(21, 39, 2)',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 6,
    borderRadius: 15,
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
  sectionTitle: {
    flex: 1,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 0.2,
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
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
