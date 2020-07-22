import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 316,
  },
  paginationContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    paddingVertical: 22,
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  dotContainerStyle: {
    marginHorizontal: 3,
  },
});

export {styles};
