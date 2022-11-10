import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomMenuContainer: {
    height: 150,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 26,
  },
  bottomMenuText: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: '600',
  },
});

export const selectedPointStyle = {
  iconImage: ['get', 'icon_image'],
  iconSize: 1,
  iconAllowOverlap: true,
};
