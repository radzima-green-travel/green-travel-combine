import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: 32,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
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
  },
  boxText: {
    textTransform: 'uppercase',
  },
});
