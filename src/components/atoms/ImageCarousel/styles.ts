import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 316,
  },
  paginationContainer: {
    height: 24,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 11,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  paginationMark: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 3,
  },
  paginationMarkActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
});

export {styles};
