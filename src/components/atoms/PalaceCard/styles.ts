import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 13},
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 5,
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 22,
    marginHorizontal: 26,
  },
  title: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 230,
  },
  imageContainer: {
    width: '100%',
    height: 230,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
});

export {styles};
